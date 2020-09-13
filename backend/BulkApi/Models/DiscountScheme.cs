using System;
using System.Collections.Generic;

namespace BulkApi.Models
{
    public class DiscountScheme
    {
        public int DiscountSchemeId { get; set; }
        public int MinOrderQnty { get; set; }
        public double DiscountedPrice { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public double DeliveryCharge { get; set; }

        //ProductFk
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public List<Bid> Bids { get; set; }
    }
}