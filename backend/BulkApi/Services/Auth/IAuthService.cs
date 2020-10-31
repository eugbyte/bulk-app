using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;


namespace BulkApi.Services.Auth
{
    public interface IAuthService
    {
        Task<bool> AuthenticateUser(string username, string password);
        Task<bool> ResetPassword(string id, string newPassword);
        Task<bool> SignIn(string username, string password);
        Task<string> CreateJWT(string username);
        Task<IdentityUser> FindUserByUserName(string userName);
        Task<bool> AddClaim(string id, string claimValue);
        Task<List<Claim>> GetClaims(string userId);
    }
}
