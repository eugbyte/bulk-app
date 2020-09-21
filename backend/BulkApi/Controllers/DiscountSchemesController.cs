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
        public async Task<ActionResult<IEnumerable<DiscountScheme>>> GetAllPendingDiscountSchemesWithBid()
        {
            return await discountSchemeService.GetAllPendingDiscountSchemesWithBid();
        }

        [HttpGet("{bidId}")]
        public async Task<ActionResult<DiscountSchemeVM>> GetDiscountSchemeWithBid(int bidId)
        {
            DiscountScheme discountScheme = await discountSchemeService.GetDiscountSchemeWithBids(bidId);
            DiscountSchemeVM discountSchemeVM = new DiscountSchemeVM(discountScheme);
            discountSchemeVM.SetAddressBidCountDict(discountScheme);

            return discountSchemeVM;
        }

        [HttpGet("success/{producerId}")]
        public async Task<ActionResult> GetSuccessfulSchemesWithBids(int producerId)
        {
            List<DiscountScheme> discountSchemes = await discountSchemeService.GetSuccessfulSchemesWithBids(producerId);
            return Ok(discountSchemes);
        }

        



    }
}
