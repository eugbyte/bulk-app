using BulkApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Services.DiscountSchemes
{
    public interface IDiscountSchemeService
    {
        Task <List<DiscountScheme>> GetAllDiscountSchemesWithBid();
        Task<List<DiscountScheme>> GetSuccessfulSchemesWithBids(string producerId);
        Task<DiscountScheme> GetDiscountSchemeWithBids(int discountSchemeId);
        Task<List<DiscountScheme>> GetAllPendingDiscountSchemesWithBid();
        Task<List<DiscountScheme>> GetDiscountSchemesWithBidOfProducer(string producerId);
        Task<DiscountScheme> CreateDiscountScheme(int minOrderQnty, double discountedPrice, DateTime? expiryDate, double deliveryCharge, int productId);
        Task<DiscountScheme> DeleteDiscountScheme(int discountSchemeId);
    }
}
