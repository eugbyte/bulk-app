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
        Task<List<DiscountScheme>> GetSuccessfulSchemesWithBids(int producerId);
        Task<DiscountScheme> GetDiscountSchemeWithBid(int discountSchemeId);
        Task<List<DiscountScheme>> GetAllPendingDiscountSchemesWithBid();
    }
}
