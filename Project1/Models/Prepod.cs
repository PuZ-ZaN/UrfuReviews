using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class Prepod : BaseEntity
    {
        public Prepod()
        {
            Reviews = new HashSet<Review>();
        }
        public Guid TrackId { get; set; }
        public string PrepodName { get; set; } = "";
        [NotMapped]
        public virtual Track? Track { get; set; }
        [NotMapped]
        public virtual ICollection<Review>? Reviews { get; set; }
    }
}
