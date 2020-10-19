using BulkApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Extensions
{
    public static class ModelBuilderExtension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            Customer customer = new Customer
            {
                Id = "1",
                UserName = "John",
                Address = "",
                Email = "john@gmail.com"
            };       

            Product product = new Product
            {
                ProductId = 1,
                Name = "Awesome Shoes",
                Category = "Shoe",
                Description = "white shoe",
                OriginalPrice = 100,
            };

            DiscountScheme discountScheme = new DiscountScheme
            {
                DiscountSchemeId = 1,
                MinOrderQnty = 5,
                DiscountedPrice = 70,
                ExpiryDate = DateTime.Now.AddMonths(1),
                DeliveryCharge = 10,
                ProductId = 1
            };

            Bid bid = new Bid
            {
                BidId = 1,
                Quantity = 2,
                CollectionAddress = "AMK MRT",
                CustomerId = "1",
                DiscountSchemeId = 1
            };

            Producer producer = new Producer
            {
                Id = "1"
            };

            modelBuilder.Entity<Customer>().HasData(customer);
            modelBuilder.Entity<Product>().HasData(product);
            modelBuilder.Entity<DiscountScheme>().HasData(discountScheme);
            modelBuilder.Entity<Bid>().HasData(bid);
            modelBuilder.Entity<Producer>().HasData(producer);
        }
    }
}
