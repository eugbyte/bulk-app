using BulkApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Services.Products
{
    public interface IProductService
    {
        Task<Product> CreateProduct(string name, string category, string description, double originalPrice, int producerId);
        Task<List<Product>> GetProducts(int producerId);
    }
}
