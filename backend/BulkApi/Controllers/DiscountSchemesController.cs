using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BulkApi.Data;
using BulkApi.Models;
using BulkApi.Services;
using BulkApi.Services.DiscountSchemes;

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
        public async Task<ActionResult<IEnumerable<DiscountScheme>>> GetDiscountSchemesWithBid()
        {
            return await discountSchemeService.GetAllPendingDiscountSchemesWithBid();
        }

        [HttpGet("{bidId}")]
        public async Task<ActionResult<DiscountScheme>> GetDiscountSchemeWithBid(int bidId)
        {
            //return BadRequest();
            return await discountSchemeService.GetDiscountSchemeWithBids(bidId);
        }

        [HttpGet("success/{producerId}")]
        public async Task<ActionResult> GetSuccessfulSchemesWithBids(int producerId)
        {
            List<DiscountScheme> discountSchemes = await discountSchemeService.GetSuccessfulSchemesWithBids(producerId);
            return Ok(discountSchemes);
        }




    }
}
