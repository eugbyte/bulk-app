using BulkApi.Data;
using BulkApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace BulkApi.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly BulkDbContext db;

        public ProductService(BulkDbContext db)
        {
            this.db = db;
        }

        public async Task<List<Product>> GetProducts(int producerId)
        {
            List<Product> products = await db.Products
                .Where(product => product.ProducerId == producerId)
                .ToListAsync();
            return products;
        }

        public async Task<Product> CreateProduct(string name, string category, string description, double originalPrice)
        {
            Product product = new Product
            {
                Name = name,
                Category = category,
                Description = description,
                OriginalPrice = originalPrice,
            };

            db.Products.Add(product);
            await db.SaveChangesAsync();
            return product;

        }
    }
}
