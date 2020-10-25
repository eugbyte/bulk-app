using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BulkApi.Services.Auth
{
    public interface IAuthService
    {
        Task<bool> AuthenticateUser(string username, string password);
        Task<bool> ResetPassword(string id, string newPassword);
        Task<bool> SignIn(string username, string password);
    }
}
