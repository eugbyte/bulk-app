using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public double OriginalPrice { get; set; }

        //FK ProducerId
        public string ProducerId { get; set; }
        public Producer Producer { get; set; }

        public List<DiscountScheme> DiscountSchemes { get; set; }
    }
}
