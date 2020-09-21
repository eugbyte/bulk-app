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
            AddressBidCountDict = new Dictionary<string, int>();
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

        
    }
}
