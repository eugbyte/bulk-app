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
using BulkApi.ViewModels;

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
        public async Task<ActionResult<List<BidVM>>> GetBidsOfCustomerInCart(int customerId)
        {
            List<Bid> bids = await bidService.GetBidsOfCustomerInCart(customerId);
            List<BidVM> bidVms = bids.Select(bid => new BidVM(bid)).ToList();
            foreach(BidVM bidVm in bidVms)
            {
                int currentBids = bidVm.DiscountScheme.Bids
                    .Where(bid => !bid.IsInCart)
                    .Aggregate(0, (accum, bid) => accum + bid.Quantity);
                bidVm.CurrentTotalBids = currentBids;
                bidVm.DiscountScheme.Bids = null;
            }
            return Ok(bidVms);
        }

        [HttpPost("addcart")]        
        public async Task<ActionResult<Bid>> AddBidToCart(Bid bid)
        {
            Bid createdBid = await bidService.AddBidToCart(bid.DiscountSchemeId, bid.Quantity, bid.CollectionAddress, bid.CustomerId);
            createdBid.DiscountScheme = null;
            return Ok(createdBid);
        }
        [HttpPut("updatecart")]
        public async Task<ActionResult<Bid>> UpdateCart(Bid bid)
        {
            Bid updatedBid = await bidService.UpdateBidInCart(bid.BidId, bid.Quantity, bid.CollectionAddress);
            updatedBid.DiscountScheme = null;
            return Ok(updatedBid);
        }

        [HttpDelete("cart/{bidId}")]
        public async Task<ActionResult> DeleteBidFromCart(int bidId)
        {
            await bidService.DeleteBidInCart(bidId);
            return Ok();
        }

        [HttpPut("cart/order")]
        public async Task<ActionResult> OrderBidsFromCart(List<Bid> bids)
        {
            int[] bidIds = bids.Select(bid => bid.BidId).ToArray();
            await bidService.OrderBidsFromCart(bidIds);

            return Ok(new { message = "ordered"});
        }

        [HttpGet("orders/{customerId}")]
        public async Task<ActionResult<List<BidVM>>> GetPendingOrSuccessfulBidsOfCustomer(int customerId)
        {
            List<Bid> pendingOrSuccessfulBids = await bidService.GetPendingOrSuccessfulBidsOfCustomer(customerId);
            List<BidVM> bidVms = pendingOrSuccessfulBids.Select(bid => new BidVM(bid)).ToList();
            foreach (BidVM bidVm in bidVms)
            { 
                int currentBids = bidVm.DiscountScheme.Bids
                    .Where(bid => !bid.IsInCart)
                    .Aggregate(0, (accum, bid) => accum + bid.Quantity);
                bidVm.CurrentTotalBids = currentBids;
                
            }

            return Ok(bidVms);
        }


    }
}
