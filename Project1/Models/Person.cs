using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Project1.Models
{
    public class Person : BaseEntity
    {
        [Key]
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

    [Owned]
    public class PersonReview
    {
        public Guid id { get; set; } = Guid.Empty;
        public string name { get; set; } = "";
    }
    //public enum Role
    //{
    //    User,
    //    Admin
    //}
}
