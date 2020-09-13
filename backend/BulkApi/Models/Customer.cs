using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Models
{
    public class Customer : IdentityUser
    {
        public int CustomerId { get; set; }
        public string Address { get; set; }

        public List<Bid> Bids { get; set; }
    }
}
