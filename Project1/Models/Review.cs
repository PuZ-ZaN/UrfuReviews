using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class Review : BaseEntity
    {
        public Guid PrepodId { get; set; }
        public string Body { get; set; }
        public Int32 Rating { get; set; }
        public Int32 Interest { get; set; }
        public Int32 Benefit { get; set; }
        public Int32 Availability { get; set; }

        public PersonReview user { get; set; } = new PersonReview { };

        public List<Guid> likes { get; set; } = new List<Guid>();
        public List<Guid> disLikes { get; set; } = new List<Guid>();

        public bool isAnonym { get; set; } = false;
        public bool isMoved { get; set; }

        [NotMapped]
        public Prepod? Prepod { get; set; }
    }
}