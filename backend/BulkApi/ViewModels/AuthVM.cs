using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BulkApi.ViewModels
{
    public class AuthVM
    {
        public string JWT { get; set; }
        public bool IsAuthenticated { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<string> Claims { get; set; }
    }
}
