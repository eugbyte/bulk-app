using BulkApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Services.Bids
{
    public interface IBidService
    {
        Task<Bid> AddBidToCart(int schemeId, int quantity, string collectionAddress, string customerId);
        Task OrderBidsFromCart(params int[] bidIds);
        Task<List<Bid>> GetBidsOfCustomerInCart(string customerId);
        Task<Bid> UpdateBidInCart(int bidId, int quantity, string collectionAddress);
        Task DeleteBidInCart(int bidId);
        Task<List<Bid>> GetPendingOrSuccessfulBidsOfCustomer(string customerId);
    }
}
