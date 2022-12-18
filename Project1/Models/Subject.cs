using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Project1.Models
{
    public class Subject : BaseEntity
    {

        public Subject() 
        {
            Tracks = new HashSet<Track>();
        }
        public int Course { get; set; }
        public string SubjectName { get; set; } = "";
        
        [NotMapped]
        public virtual ICollection<Track>? Tracks { get; set; }

    }
}
