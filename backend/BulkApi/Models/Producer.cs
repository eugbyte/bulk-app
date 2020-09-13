using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Models
{
    public class Producer
    {
        public int ProducerId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ApiUrl { get; set; }

        public List<Product> Products { get; set; }
    }
}
