﻿using BulkApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.ViewModels
{
    public class BidVM : Bid
    {
        public int CurrentTotalBids { get; set; }
        public IDictionary<string, int> AddressBidCountDict { get; set; }

        public BidVM() 
        {
            AddressBidCountDict = new Dictionary<string, int>()
            {
                { "AMK", 0 },
                { "BISHAN", 0 },
                { "SERANGOON", 0 }
            };
        }
        public BidVM(Bid bid): this()
        {
            BidId = bid.BidId;
            IsInCart = bid.IsInCart;
            Quantity = bid.Quantity;
            BidSuccessDate = bid.BidSuccessDate;
            CollectionAddress = bid.CollectionAddress;
            CustomerId = bid.CustomerId;
            Customer = bid.Customer;
            DiscountSchemeId = bid.DiscountSchemeId;
            DiscountScheme = bid.DiscountScheme;

        }

        public IDictionary<string, int> SetAddressBidCountDictionary(DiscountScheme discountScheme)
        {

            foreach (Bid bid in discountScheme.Bids)
            {
                if (AddressBidCountDict.ContainsKey(bid.CollectionAddress))
                {
                    AddressBidCountDict[bid.CollectionAddress] += bid.Quantity;
                }
                else
                {
                    AddressBidCountDict[bid.CollectionAddress] = bid.Quantity;
                }
            }
            return AddressBidCountDict;
        }
    }
}
