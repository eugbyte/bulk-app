using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BulkApi.Data;
using BulkApi.Models;
using BulkApi.Services.Products;

namespace BulkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService productService;

        public ProductsController(IProductService productService)
        {
           this.productService = productService;
        }

        // GET: api/Products
        [HttpGet("producer/{producerId}")]
        public async Task<ActionResult<List<Product>>> GetProducts(int producerId)
        {
            return await productService.GetProducts(producerId);
        }

        
        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            return Ok();
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            Product createdProduct = await productService.CreateProduct(product.Name, product.Category, product.Description, product.OriginalPrice);
            return Ok(createdProduct);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            return Ok();
        }
    }
}
