using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BulkApi.Data;
using BulkApi.Models;
using BulkApi.Services.Bids;

namespace BulkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly IBidService bidService;

        public BidsController(IBidService bidService)
        {
            this.bidService = bidService;
        }

        [HttpGet("cart/{customerId}")]
        public async Task<ActionResult<List<Bid>>> GetBidsOfCustomerInCart(int customerId)
        {
            List<Bid> bids = await bidService.GetBidsOfCustomerInCart(customerId);
            return Ok(bids);
        }

        [HttpPost("cart")]        
        public async Task<ActionResult<Bid>> AddBidToCart(Bid bid)
        {
            Bid createdBid = await bidService.AddBidToCart(bid.DiscountSchemeId, bid.Quantity, bid.CollectionAddress, bid.CustomerId);
            createdBid.DiscountScheme = null;
            return Ok(createdBid);
        }

        [HttpPut("order")]
        public async Task<ActionResult> OrderBidsFromCart(List<Bid> bids)
        {
            int[] bidIds = bids.Select(bid => bid.BidId).ToArray();
            await bidService.OrderBidsFromCart(bidIds);

            return Ok(new { message = "ordered"});
        }



    }
}
