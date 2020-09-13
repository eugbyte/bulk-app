using BulkApi.Data;
using BulkApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Z.EntityFramework.Plus;

namespace BulkApi.Services.DiscountSchemes
{
    public class DiscountSchemeService : IDiscountSchemeService
    {
        private readonly BulkDbContext db;
        public DiscountSchemeService(BulkDbContext db)
        {
            this.db = db;
        }
        public async Task <List<DiscountScheme>> GetAllDiscountSchemesWithBid()
        {
            List<DiscountScheme> discountSchemes = await db.DiscountSchemes
                .IncludeOptimized(ds => ds.Bids)
                .IncludeOptimized(ds => ds.Product)
                .ToListAsync();

            return discountSchemes;
        }

        public async Task<List<DiscountScheme>> GetAllPendingDiscountSchemesWithBid()
        {
            List<DiscountScheme> discountSchemes = await GetAllDiscountSchemesWithBid();            

            // Remove discountSchemes that have already succeeded
            discountSchemes = discountSchemes.Where(ds => ds.Bids.Any(bid => bid.BidSuccessDate == null)).ToList();

            // Remove bids that are already in cart
            for (int i = 0; i < discountSchemes.Count; i++)
            {
                RemoveBidsInCart(discountSchemes[i]);
            }

            return discountSchemes;
        }

        private void RemoveBidsInCart(DiscountScheme discountScheme)
        {
            if (discountScheme.Bids == null)
                return;
            List<Bid> bids = discountScheme.Bids.Where(bid => !bid.IsInCart).ToList();
            discountScheme.Bids = bids;
        }

        public async Task<DiscountScheme> GetDiscountSchemeWithBid(int discountSchemeId)
        {
            DiscountScheme discountScheme = await db.DiscountSchemes
                .Where(ds => ds.DiscountSchemeId == discountSchemeId)
                .IncludeOptimized(ds => ds.Bids)
                .IncludeOptimized(ds => ds.Product)
                .FirstOrDefaultAsync();

            return discountScheme;
        }

        public async Task <List<DiscountScheme>> GetSuccessfulSchemesWithBids(int producerId)
        {
            List<Product> products = await db.Producers
                .Where(producer => producer.ProducerId == producerId)
                .SelectMany((Producer producer) => producer.Products)
                .ToListAsync();

            int[] productIds = products.Select(p => p.ProducerId).ToArray();

            List<DiscountScheme> discountSchemes = await db.DiscountSchemes
                .Where(ds => productIds.Contains(ds.ProductId))
                .IncludeOptimized(ds => ds.Bids)
                .ToListAsync();

            discountSchemes = discountSchemes
                .Where(ds => ds.Bids.Any(bid => bid.BidSuccessDate != null))
                .ToList();
             
            return discountSchemes;
        }
    }
}
