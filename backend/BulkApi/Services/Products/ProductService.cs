using BulkApi.Data;
using BulkApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Z.EntityFramework.Plus;
using BulkApi.Exceptions;

namespace BulkApi.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly BulkDbContext db;

        public ProductService(BulkDbContext db)
        {
            this.db = db;
        }

        public async Task<Product> GetProduct(int productId)
        {
            Product product = await db.Products
                .IncludeOptimized(product => product.DiscountSchemes)
                .FirstOrDefaultAsync(product => product.ProductId == productId);
            return product;
        }

        public async Task<List<Product>> GetProductsOfProducer(string producerId)
        {
            List<Product> products = await db.Products
                .Where(product => product.ProducerId == producerId)
                .IncludeOptimized(product => product.DiscountSchemes)
                .ToListAsync();
            return products;
        }

        public async Task<Product> CreateProduct(string name, string category, string description, double originalPrice, string producerId)
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

        public async Task<Product> UpdateProduct(int productId, Product product)
        {
            Product existingProduct = await db.Products.FindAsync(productId);
            existingProduct.Category = product.Category;
            existingProduct.Description = product.Description;
            existingProduct.Name = product.Name;
            existingProduct.OriginalPrice = product.OriginalPrice;
            await db.SaveChangesAsync();
            return existingProduct;
        }

        public async Task<Product> DeleteProduct(int productId)
        {
            Product existingProduct = await db.Products
                .IncludeOptimized(product => product.DiscountSchemes)
                .FirstOrDefaultAsync(product => product.ProductId == productId);

            if (ProductHasPendingSchemes(existingProduct)) {
                throw new ProductNoCascadeDeleteException();
            }

            db.Products.Remove(existingProduct);
            await db.SaveChangesAsync();
            return existingProduct;
        }

        private bool ProductHasPendingSchemes(Product existingProduct) 
        { 
            if (existingProduct.DiscountSchemes == null)
            {
                return false;
            }
            return existingProduct.DiscountSchemes.Count > 0;
        }
    }
}
