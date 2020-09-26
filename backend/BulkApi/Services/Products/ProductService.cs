using BulkApi.Data;
using BulkApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Services.Products
{
    public class ProductService
    {
        private readonly BulkDbContext db;

        public ProductService(BulkDbContext db)
        {
            this.db = db;
        }

        public async Task<Product> CreateProduct(string name, string category, string description, double originalPrice, int producerId)
        {
            Product product = new Product
            {
                Name = name,
                Category = category,
                Description = description,
                OriginalPrice = originalPrice,
                ProducerId = producerId
            };

            db.Products.Add(product);
            await db.SaveChangesAsync();
            return product;

        }
    }
}
