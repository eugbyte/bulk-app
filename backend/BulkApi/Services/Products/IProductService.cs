﻿using BulkApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Services.Products
{
    public interface IProductService
    {
        Task<Product> CreateProduct(string name, string category, string description, double originalPrice, string producerId);
        Task<List<Product>> GetProductsOfProducer(string producerId);
        Task<Product> GetProduct(int productId);
        Task<List<Product>> GetProducts();
        Task<Product> UpdateProduct(int productId, Product product);
        Task<Product> DeleteProduct(int productId);
    }
}
