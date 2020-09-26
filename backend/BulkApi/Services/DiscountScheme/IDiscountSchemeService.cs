﻿using BulkApi.Models;
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
        Task<DiscountScheme> GetDiscountSchemeWithBids(int discountSchemeId);
        Task<List<DiscountScheme>> GetAllPendingDiscountSchemesWithBid();
        Task<List<DiscountScheme>> GetDiscountSchemesWithBidOfProducer(int producerId);
    }
}
