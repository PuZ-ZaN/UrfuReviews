using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class Review : BaseEntity
    {
        public Guid PrepodId { get; set; }
        public string Header { get; set; }
        public string Body { get; set; }
        public List<string> AdditionalImages { get; set; }

        public Stars Rating { get; set; }

        [NotMapped]
        public Prepod? Prepod { get; set; }
    }
    public enum Stars
    {
        //rare, medium rare, well done и т.д
        VeryBad,
        Bad,
        Middle,
        Good,
        VeryGood
    }
}
