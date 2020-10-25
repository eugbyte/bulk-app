using BulkApi.Data;
using BulkApi.Exceptions;
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

        private bool IsCustomerExists(string customerId)
        {
            return db.Customers.Any(customer => customer.Id == customerId.ToString());
        }               

        public async Task<List<Bid>> GetBidsOfCustomerInCart(string customerId)
        {
            if (!IsCustomerExists(customerId))
                throw new EntityNotFoundException(customerId, typeof(Customer));

            List<Bid> bids = await db.Bids
                .Where(bid => bid.CustomerId == customerId)
                .Where(bid => bid.IsInCart) 
                .Include(bid => bid.DiscountScheme)
                    .ThenInclude(ds => ds.Product)
                .ToListAsync();            

            return bids;
        }

        // Bascially, GetBidsOfCustomers Not InCart
        public async Task<List<Bid>> GetPendingOrSuccessfulBidsOfCustomer(string customerId)
        {
            if (!IsCustomerExists(customerId))
                throw new EntityNotFoundException(customerId, typeof(Customer));

            List<Bid> bids = await db.Bids
                .Where(bid => bid.CustomerId == customerId)
                .Where(bid => !bid.IsInCart)
                .Include(bid => bid.DiscountScheme)
                    .ThenInclude(ds => ds.Product)
                .ToListAsync();
            return bids;
        }

        public async Task OrderBidsFromCart(params int[] bidIds)
        {
            List<Bid> bids = await db.Bids
                .Where(bid => bidIds.Contains(bid.BidId))
                .ToListAsync();

            List<DiscountScheme> discountSchemes = await db.DiscountSchemes
                .IncludeOptimized(ds => ds.Bids)
                .ToListAsync();

            foreach(Bid bid in bids)
            {
                //1. For now, ignore validation whether the bids will exceed the bid limit imposed by the Discount Scheme
                //2. update the bidStatus that it is no longer in the cart

                //DiscountScheme has Bid property eager loaded
                DiscountScheme discountScheme = discountSchemes
                    .FirstOrDefault(ds => ds.DiscountSchemeId == bid.DiscountSchemeId);

                int currentNumBids = GetNumberOfPendingBidsOfScheme(discountScheme);

                currentNumBids += bid.Quantity;

                //2. update the bidStatus that it is no longer in the cart
                bid.IsInCart = false;
                db.Bids.Update(bid);
                await db.SaveChangesAsync();

                // If the minOrderQuantity is reached, bid is successful ...
                if (currentNumBids >= discountScheme.MinOrderQnty)
                {
                    await SetBidSuccessDateAndDeliveryCharge(discountScheme);
                }
               
            }

        }

        private async Task SetBidSuccessDateAndDeliveryCharge(DiscountScheme discountScheme)
        {
            if (discountScheme.Bids == null || discountScheme.Bids.Count == 0)
                throw new NullReferenceException("discount scheme does not have any bids.\n Check that the bids are eagerly loaded");

            discountScheme.Bids.ForEach(bid => bid.BidSuccessDate = DateTime.Now);

            double finalDeliveryCharge = discountScheme.DeliveryCharge / discountScheme.Bids.Count();
            discountScheme.Bids.ForEach(bid => bid.FinalDeliveryCharge = finalDeliveryCharge);

            db.DiscountSchemes.Update(discountScheme);
            await db.SaveChangesAsync();
        }

        private int GetNumberOfPendingBidsOfScheme(DiscountScheme discountScheme)
        {
            if (discountScheme.Bids == null || discountScheme.Bids.Count == 0)
                throw new NullReferenceException("discount scheme does not have any bids.\n Check that the bids are eagerly loaded");

            int currentNumBids = discountScheme.Bids
                    .Where(b => !b.IsInCart)
                    .ToList()
                    .Aggregate(0, (acc, b) => acc + b.Quantity);
            return currentNumBids;
        }

        public async Task<Bid> AddBidToCart(int schemeId, int quantity, string collectionAddress, string customerId)
        {             
            
            // Check whether the bid for the same discountScheme exist in cart
            // If so, update, else, create
            Bid existingBid = await db.Bids
                .Where(bid => bid.IsInCart)
                .Where(bid => bid.DiscountSchemeId == schemeId)
                .Where(bid => bid.CustomerId == customerId)
                .Where(bid => bid.CollectionAddress == collectionAddress)
                .FirstOrDefaultAsync();
            
            // Update bid if it already exists in cart, by incrementing the quantity
            if (existingBid != null)
            {
                existingBid.Quantity += quantity;
                await db.SaveChangesAsync();
                return existingBid;
            }

            Bid newBid = await AddBid(isInCart: true, quantity: quantity, collectionAddress: collectionAddress, customerId: customerId, discountSchemeId: schemeId);
            return newBid;
        }

        private async Task<Bid> AddBid(bool isInCart=true,int quantity=0, DateTime? bidSuccessDate=null, string collectionAddress="", string customerId="0", int discountSchemeId=0)
        {
            Bid newBid = new Bid
            {
                Quantity = quantity,
                DiscountSchemeId = discountSchemeId,
                CollectionAddress = collectionAddress,
                CustomerId = customerId,
                IsInCart = isInCart,
                BidSuccessDate = bidSuccessDate
            };
            db.Bids.Add(newBid);
            await db.SaveChangesAsync();
            return newBid;

        }

        public async Task<Bid> UpdateBidInCart(int bidId, int quantity, string collectionAddress)
        {
            // Check whether the bid for the same discountScheme exist in cart
            // If so, update, else, create
            Bid existingBid = await db.Bids
                .Where(bid => bid.BidId == bidId)
                .FirstOrDefaultAsync();

            if (existingBid == null)
                throw new EntityNotFoundException(bidId, typeof(Bid));

            existingBid.Quantity = quantity;
            existingBid.CollectionAddress = collectionAddress;
            await db.SaveChangesAsync();
            return existingBid;
        }

        public async Task DeleteBidInCart(int bidId)
        {
            Bid existingBid = await db.Bids.FirstOrDefaultAsync(bid => bid.BidId == bidId);
            db.Bids.Remove(existingBid);
            await db.SaveChangesAsync();
        } 

        


    }
}
