using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Project1.Models
{
    public class SubjectViewModel : BaseEntity
    {
        public List<int> Semester { get; set; }
        public string SubjectName { get; set; } = "";
        public IFormFile? Picture { get; set; }

    }
}
