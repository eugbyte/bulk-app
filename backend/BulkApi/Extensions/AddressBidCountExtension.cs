using BulkApi.Models;
using BulkApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Extensions
{
    public static class AddressBidCountExtension
    { 

        private static IDictionary<string, int> _SetAddressBidCountDict(DiscountScheme discountScheme)
        {

            IDictionary<string, int> addressBidCountDict = new Dictionary<string, int>()
            {
                { "AMK", 0 },
                { "BISHAN", 0 },
                { "SERANGOON", 0 }
            };

            if (discountScheme.Bids == null)
                throw new NullReferenceException("Bids must be eagerly loaded");

            foreach (Bid bid in discountScheme.Bids)
            {
                if (bid.BidSuccessDate != null || bid.IsInCart)
                    continue;

                if (addressBidCountDict.ContainsKey(bid.CollectionAddress))
                {
                    addressBidCountDict[bid.CollectionAddress] += 1;
                }
                else
                {
                    addressBidCountDict[bid.CollectionAddress] = 1;
                }
            }
            return addressBidCountDict;
        }

        public static IDictionary<string, int> SetAddressBidCountDict(this DiscountSchemeVM discountSchemeVM, DiscountScheme discountScheme)
        {
            if (discountSchemeVM.DiscountSchemeId != discountScheme.DiscountSchemeId)
                throw new InvalidOperationException("DiscountScheme Ids do not match");

            discountSchemeVM.AddressBidCountDict = _SetAddressBidCountDict(discountScheme);
            return discountSchemeVM.AddressBidCountDict;
        }

        public static IDictionary<string, int> SetAddressBidCountDict(this BidVM bidVM, DiscountScheme discountScheme)
        {
            if (bidVM.DiscountSchemeId != discountScheme.DiscountSchemeId)
                throw new InvalidOperationException("DiscountScheme Ids do not match");
            bidVM.AddressBidCountDict = _SetAddressBidCountDict(discountScheme);
            return bidVM.AddressBidCountDict;

        }
    }
}
