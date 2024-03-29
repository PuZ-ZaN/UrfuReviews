﻿using BCrypt.Net;
using IdentityModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Project1.Auth;
using Project1.Data;
using Project1.Models;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace Project1.Controllers
{
    [Route("auth")]
    public class AccountController : Controller
    {
        protected ApiDbContext Context => HttpContext.RequestServices.GetService(typeof(ApiDbContext)) as ApiDbContext;

        [HttpPost("login")]
        public IActionResult Token([FromForm] string email, [FromForm] string password)
        {
            var identity = GetIdentity(email, password);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name,
            };

            return Json(response);
        }

        [HttpGet("me")]
        public IActionResult Authme()
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");

            string role = "", name = "";
            Guid id = Guid.Empty;

            try
            {
                var handler = new JwtSecurityTokenHandler();

                // валидация токена

                var jwtSecurityToken = handler.ReadJwtToken(token);
                var validationParameters = AuthValidation.GetValidationParameters();

                SecurityToken validatedToken;
                IPrincipal principal = handler.ValidateToken(token, validationParameters, out validatedToken);

                // сохранение нужных полей для ответа    

                var claims = jwtSecurityToken.Claims.ToList();

                foreach (var claim in claims)
                {
                    if (claim.Type.Contains("role"))
                    {
                        role = claim.Value;
                    }
                    else if (claim.Type.Contains("name"))
                    {
                        name = claim.Value;
                    }
                    else if (claim.Type.Contains("userdata"))
                    {
                        id = new Guid(claim.Value);
                    }
                }

                return Json(new
                {
                    access_token = token,
                    username = name,
                    role = role,
                    id = id,
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { errorText = "Invalid token" });
            }
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            Person person = Context.Person.FirstOrDefault(x => (x.Email == email));
            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, person.Password);

            if (person != null && isValidPassword)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Email),
                    new Claim(ClaimTypes.UserData, person.Id.ToString()),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
        [HttpPost("register")]
        public IActionResult Register([FromForm] string email, [FromForm] string password)
        {
            var hashPassword = BCrypt.Net.BCrypt.HashPassword(password);

            if (!email.Contains("@"))
            {
                return BadRequest(new { errorText = "Need '@' in Email" });
            }
            var username = email.Split('@')[0];
            if (!email.Contains("urfu.me") && !email.Contains("at.urfu.ru")) //TODO: всё расхардкодить в конфиг
            {
                return BadRequest(new { errorText = "Supported only URFU Emails" });
            }
            if (Context.Person.FirstOrDefault(x => x.Email.Contains(username)) != null)
            {
                return BadRequest(new { errorText = "Email already registered!" });
            }
            Context.Person.Add(new Person { Email = username, Password = hashPassword, Role = "User" });
            Context.SaveChanges();
            return Ok();
        }
    }
}

