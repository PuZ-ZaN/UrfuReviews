using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project1.Auth;
using Project1.Data;
using Project1.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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
                username = identity.Name
            };

            return Json(response);
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            Person person = Context.Person.FirstOrDefault(x => (x.Email == email && x.Password == password));
            Console.WriteLine(email);
            Console.WriteLine(password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Email),
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
            Context.Person.Add(new Person { Email = username, Password = password, Role = "User" });
            Context.SaveChanges();
            return Ok();
        }
    }
}

