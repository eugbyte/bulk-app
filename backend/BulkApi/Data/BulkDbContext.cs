using BulkApi.Extensions;
using BulkApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Data
{
    public class BulkDbContext : DbContext
    {
        public BulkDbContext(DbContextOptions<BulkDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //This method is required to map the keys for the IdentityUser in the SQL User table
            base.OnModelCreating(modelBuilder);
            modelBuilder.Seed();
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Bid> Bids { get; set; }
        public DbSet<DiscountScheme> DiscountSchemes { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Producer> Producers { get; set; }

    }
}
