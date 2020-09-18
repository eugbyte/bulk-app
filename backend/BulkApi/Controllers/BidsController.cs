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
using BulkApi.Services.DiscountSchemes;

namespace BulkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly IBidService bidService;
        private readonly IDiscountSchemeService discountSchemeService;

        public BidsController(IBidService bidService, IDiscountSchemeService discountSchemeService)
        {
            this.bidService = bidService;
            this.discountSchemeService = discountSchemeService;
        }

        [HttpGet("cart/{customerId}")]
        public async Task<ActionResult<List<BidVM>>> GetBidsOfCustomerInCart(int customerId)
        {
            List<Bid> bids = await bidService.GetBidsOfCustomerInCart(customerId);
            int[] dsIds = bids.Select(bid => bid.DiscountSchemeId).ToArray();
            List<BidVM> bidVms = bids.Select(bid => new BidVM(bid)).ToList();

            List<DiscountScheme> discountSchemes = await discountSchemeService.GetAllDiscountSchemesWithBid();

            foreach(BidVM bidVm in bidVms)
            {                                
                bidVm.CurrentTotalBids = GetTotalPendingBids(bidVm.DiscountSchemeId, discountSchemes);
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

            List<DiscountScheme> discountSchemes = await discountSchemeService.GetAllDiscountSchemesWithBid();
            foreach (BidVM bidVm in bidVms)
            {                
                bidVm.CurrentTotalBids = GetTotalPendingBids(bidVm.DiscountSchemeId, discountSchemes);                
            }

            return Ok(bidVms);
        }

        private int GetTotalPendingBids(int discountSchemeId, List<DiscountScheme> discountSchemes)
        {
            //The discountSchemes must have the Bid property eagerly loaded
            if (discountSchemes.Any(ds => ds.Bids == null))
                throw new Exception("Bid property of discountScheme is not eagerly loaded");

            DiscountScheme discountScheme = discountSchemes.Where(ds => ds.DiscountSchemeId == discountSchemeId).FirstOrDefault();
            int currentBids = discountScheme.Bids
                .Where(bid => !bid.IsInCart)
                .Aggregate(0, (accum, bid) => accum + bid.Quantity);
            return currentBids;
        }


    }
}
