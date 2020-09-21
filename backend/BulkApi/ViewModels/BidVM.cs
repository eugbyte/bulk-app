using BulkApi.Models;
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
            AddressBidCountDict = new Dictionary<string, int>();
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


    }
}
