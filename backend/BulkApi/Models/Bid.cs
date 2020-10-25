using System;

namespace BulkApi.Models
{
    public class Bid
    {
        public int BidId { get; set; }
        
        //The InCart property is important
        public bool IsInCart { get; set; }

        public int Quantity { get; set; }
        public DateTime? BidSuccessDate { get; set; }
        public string CollectionAddress { get; set; }
        public double FinalDeliveryCharge { get; set; }

        //CustomerFK
        public string CustomerId { get; set; }
        public Customer Customer { get; set; }

        //DiscountSchemeFk
        public int DiscountSchemeId { get; set; }
        public DiscountScheme DiscountScheme { get; set; }

        
    }
}