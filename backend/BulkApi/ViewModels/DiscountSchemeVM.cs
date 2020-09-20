using BulkApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.ViewModels
{
    public class DiscountSchemeVM : DiscountScheme
    { 

        public IDictionary<string, int> AddressBidCountDict { get; set; } 

        public DiscountSchemeVM()
        {
            AddressBidCountDict = new Dictionary<string, int>()
            {
                { "AMK", 0 },
                { "BISHAN", 0 },
                { "SERANGOON", 0 }
            };
        }

        public DiscountSchemeVM(DiscountScheme discountScheme) : this()
        {
            DiscountSchemeId = discountScheme.DiscountSchemeId;
            MinOrderQnty = discountScheme.MinOrderQnty;
            DiscountedPrice = discountScheme.DiscountedPrice;
            ExpiryDate = discountScheme.ExpiryDate;
            DeliveryCharge = discountScheme.DeliveryCharge;
            ProductId = discountScheme.ProductId;
            Product = discountScheme.Product;
            Bids = discountScheme.Bids;            

        }

        public IDictionary<string, int> SetAddressBidCountDictionary()
        {
       
            foreach (Bid bid in Bids)
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
