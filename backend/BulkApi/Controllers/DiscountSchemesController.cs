using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BulkApi.Data;
using BulkApi.Models;
using BulkApi.Extensions;
using BulkApi.Services.DiscountSchemes;
using BulkApi.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace BulkApi.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountSchemesController : ControllerBase
    {
        private readonly IDiscountSchemeService discountSchemeService;

        public DiscountSchemesController(IDiscountSchemeService discountSchemeService)
        {
            this.discountSchemeService = discountSchemeService;
        }

        // GET: api/DiscountSchemes
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<DiscountScheme>>> GetAllPendingDiscountSchemesWithBid()
        {
            return await discountSchemeService.GetAllPendingDiscountSchemesWithBid();
        }

        [HttpGet("{bidId}")]
        [Authorize(Policy = "ConsumerPolicy")]
        public async Task<ActionResult<DiscountSchemeVM>> GetDiscountSchemeWithBid(int bidId)
        {
            DiscountScheme discountScheme = await discountSchemeService.GetDiscountSchemeWithBids(bidId);
            DiscountSchemeVM discountSchemeVM = new DiscountSchemeVM(discountScheme);
            discountSchemeVM.SetAddressBidCountDict(discountScheme);

            return discountSchemeVM;
        }
        
        [HttpGet("producer/{producerId}")]
        [Authorize(Policy = "ProducerPolicy")]
        public async Task<ActionResult<List<DiscountScheme>>> GetDiscountSchemesWithBidOfProducer(string producerId)
        {
            List<DiscountScheme> discountSchemes = await discountSchemeService.GetDiscountSchemesWithBidOfProducer(producerId);
            discountSchemes.Reverse();
            return discountSchemes;
        }   
        
        [HttpPost]
        [Authorize(Policy = "ProducerPolicy")]
        public async Task<ActionResult<DiscountScheme>> CreateDiscountScheme(DiscountScheme ds)
        {
            DiscountScheme createdDiscountScheme = await discountSchemeService.CreateDiscountScheme(
                minOrderQnty: ds.MinOrderQnty,
                discountedPrice: ds.DiscountedPrice,
                expiryDate: ds.ExpiryDate,
                deliveryCharge: ds.DeliveryCharge,
                productId: ds.ProductId );
            return Ok(createdDiscountScheme);
        }

        [HttpDelete("{discountSchemeId}")]
        [Authorize(Policy = "ProducerPolicy")]
        public async Task<ActionResult<DiscountScheme>> DeleteDiscountScheme(int discountSchemeId)
        {
            DiscountScheme deletedDiscountScheme = await discountSchemeService.DeleteDiscountScheme(discountSchemeId);
            return Ok(deletedDiscountScheme);
        }

    }
}
