using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Exceptions
{
    public class ProductNoCascadeDeleteException : InvalidOperationException
    {   

        public ProductNoCascadeDeleteException() : base(ErrorMessage.message)
        {            
        }

        public ProductNoCascadeDeleteException(string message, Exception inner) : base(message, inner)
        {
        }
    }

    public static class ErrorMessage
    {
        public static string message = "Product has got dependent discountSchemes. Cascade delete disallowed";
    }
}
