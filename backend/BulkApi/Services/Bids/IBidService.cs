using BulkApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Services.Bids
{
    public interface IBidService
    {
        Task<Bid> AddBidToCart(int schemeId, int quantity, string collectionAddress, int customerId);
        Task OrderBidsFromCart(params int[] bidIds);
        Task<List<Bid>> GetBidsOfCustomerInCart(int customerId);
        Task<Bid> UpdateBidInCart(int schemeId, int quantity, string collectionAddress, int customerId);
        Task DeleteBidInCart(int bidId);
        Task<List<Bid>> GetPendingOrSuccessfulBidsOfCustomer(int customerId);
    }
}
