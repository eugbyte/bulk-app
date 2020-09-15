using BulkApi.Data;
using BulkApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Z.EntityFramework.Plus;

namespace BulkApi.Services.Bids
{
    public class BidService : IBidService
    {
        private readonly BulkDbContext db;
        public BidService(BulkDbContext db)
        {
            this.db = db;
        }

        public async Task<List<Bid>> GetBidsOfCustomerInCart(int customerId)
        {
            List<Bid> bids = await db.Bids
                .Where(bid => bid.CustomerId == customerId)
                .Where(bid => bid.IsInCart)
                .ToListAsync();

            List<DiscountScheme> discountSchemes = await db.DiscountSchemes
                .IncludeOptimized(ds => ds.Product)
                .ToListAsync();

            foreach(Bid bid in bids)
            {
                DiscountScheme discountScheme = discountSchemes.Find(ds => ds.DiscountSchemeId == bid.DiscountSchemeId);
                discountScheme.Bids = null;
                bid.DiscountScheme = discountScheme;
            }

            return bids;
        }

        public async Task OrderBidsFromCart(params int[] bidIds)
        {
            List<Bid> bids = await db.Bids
                .Where(bid => bidIds.Contains(bid.BidId))
                .IncludeOptimized(bid => bid.DiscountScheme)
                .ToListAsync();            

            foreach(Bid bid in bids)
            {
                //1. validate whether the bids will exceed the bid limit imposed by the Discount Scheme
                //2. update the bidStatus that it is no longer in the cart

                //1. validate whether the bids will exceed the bid limit imposed by the Discount Scheme
                //DiscountScheme has Bid property eager loaded
                DiscountScheme discountScheme = bid.DiscountScheme;
                int currentNumBids = GetTotalBidsForDiscountScheme(discountScheme.DiscountSchemeId);
                currentNumBids += bid.Quantity;
                bool hasMinOrderQuantityReached = currentNumBids > discountScheme.MinOrderQnty;
                if (hasMinOrderQuantityReached)
                    throw new Exception($"after taking into account current quantity bidded for, will exceed bid limit. Failed to order bid {bid.BidId}");

                //2. update the bidStatus that it is no longer in the cart
                bid.IsInCart = false;
                db.Bids.Update(bid);
                await db.SaveChangesAsync();

                if (currentNumBids == discountScheme.MinOrderQnty)
                {
                    discountScheme.Bids.ForEach(bid => bid.BidSuccessDate = DateTime.Now);
                    db.DiscountSchemes.Update(discountScheme);
                    await db.SaveChangesAsync();
                }
               
            }

        }

        public async Task<Bid> AddBidToCart(int schemeId, int quantity, string collectionAddress, int customerId)
        {             
            
            // Check whether the bid for the same discountScheme exist in cart
            // If so, update, else, create
            Bid existingBid = await db.Bids
                .Where(bid => bid.DiscountSchemeId == schemeId)
                .Where(bid => bid.CustomerId == customerId)
                .Where(bid => bid.CollectionAddress == collectionAddress)
                .FirstOrDefaultAsync();
            
            // Update bid if it already exists in cart
            if (existingBid != null)
            {
                existingBid.Quantity += quantity;
                await db.SaveChangesAsync();
                return existingBid;
            }

            // Otherwise add to cart
            Bid newBid = new Bid
            {
                Quantity = quantity,
                DiscountSchemeId = schemeId,
                CollectionAddress = collectionAddress,
                CustomerId = customerId,
                IsInCart = true
            };

            db.Bids.Add(newBid);
            await db.SaveChangesAsync();
            return newBid;
        }

        public async Task<Bid> UpdateBidInCart(int schemeId, int quantity, string collectionAddress, int customerId)
        {
            // Check whether the bid for the same discountScheme exist in cart
            // If so, update, else, create
            Bid existingBid = await db.Bids
                .Where(bid => bid.DiscountSchemeId == schemeId)
                .Where(bid => bid.CustomerId == customerId)
                .Where(bid => bid.CollectionAddress == collectionAddress)
                .FirstOrDefaultAsync();

            existingBid.Quantity = quantity;
            await db.SaveChangesAsync();
            return existingBid;
        }

        public async Task DeleteBidInCart(int bidId)
        {
            Bid existingBid = await db.Bids.FirstOrDefaultAsync(bid => bid.BidId == bidId);
            db.Bids.Remove(existingBid);
            await db.SaveChangesAsync();
        }

        private int GetTotalBidsForDiscountScheme(int discountSchemeId)
        {
            int countBids = db.Bids
                .Where(b => b.DiscountSchemeId == discountSchemeId)
                .Where(b => !b.IsInCart)
                .ToList()
                .Aggregate(0, (acc, b) => acc + b.Quantity);
            return countBids;
        } 

    }
}
