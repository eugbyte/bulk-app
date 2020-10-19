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
        public async Task<ActionResult<List<Product>>> GetProductsOfProducer(string producerId)
        {
            return await productService.GetProductsOfProducer(producerId);
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<Product>> GetProduct(int productId)
        {
            return await productService.GetProduct(productId);            
        }


        // PUT: api/Products/5
        [HttpPut("{productId}")]
        public async Task<IActionResult> PutProduct(int productId, Product product)
        {
            if (productId != product.ProductId)
            {
                return BadRequest();
            }

            Product updatedProduct = await productService.UpdateProduct(productId, product);
            return Ok(updatedProduct);

        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            Product createdProduct = await productService.CreateProduct(product.Name, product.Category, product.Description, product.OriginalPrice, product.ProducerId);
            return Ok(createdProduct);
        }

        // DELETE: api/Products/5
        [HttpDelete("{productId}")]
        public async Task<ActionResult<Product>> DeleteProduct(int productId)
        {
            Product deletedProduct = await productService.DeleteProduct(productId);
            return Ok(deletedProduct);
        }
    }
}
