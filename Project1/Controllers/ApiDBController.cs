using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

using Project1.Data;
using Project1.Models;

namespace Project1.Controllers
{
    [ApiController]
    [Route("api")]
    public class ApiDBController : ControllerBase
    {
        protected ApiDbContext Context => HttpContext.RequestServices.GetService(typeof(ApiDbContext)) as ApiDbContext;

        [HttpGet("Subjects/{i?}")]
        public IEnumerable<Subject> GetAllSubjects(Guid? i)
        {
            if (i is null)
                return Context.Subjects.ToList();
            else
                return Context.Subjects.Where(t => t.Id == i);
        }

        [HttpGet("Tracks/{i?}")]
        public IEnumerable<Track> GetAllTracks(Guid? i)
        {
            if (i is null)
                return Context.Tracks.ToList();
            else
                return Context.Tracks.Where(t => t.Id == i);
        }

        [HttpGet("Prepods/{i?}")]
        public IEnumerable<Prepod> GetAllPrepods(Guid? i)
        {
            if (i is null)
                return Context.Prepods.ToList();
            else
                return Context.Prepods.Where(t => t.Id == i);
        }

        [HttpGet("Reviews/{i?}")]
        public IEnumerable<Review> GetAllReviews(Guid? i)
        {
            if (i is null)
                return Context.Reviews.ToList();
            else
                return Context.Reviews.Where(t => t.Id == i);
        }

        [HttpGet("All")]
        public CommonAddModel GetAll()
        {
            return new CommonAddModel()
            {
                Subjects = Context.Subjects.ToList(),
                Prepods = Context.Prepods.ToList(),
                Reviews = Context.Reviews.ToList(),
                Tracks = Context.Tracks.ToList(),
            };
        }

        [HttpPost("AddSubject")]
        public Guid AddSubject(Subject value)
        {
            Context.Subjects.Add(value);
            Context.SaveChanges();
            return value.Id;
        }

        [HttpPost("AddTrack")]
        public JsonResult AddTrack(Track value)
        {
            try
            {
                Context.Tracks.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id});
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.InnerException?.Message ?? "DB Error" });
            }
        }

        [HttpPost("AddPrepod")]
        public JsonResult AddPrepod(Prepod value)
        {
            try
            {
                Context.Prepods.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.InnerException?.Message ?? "DB Error" });
            }
        }

        [HttpPost("AddReview")]
        public JsonResult AddReview(Review value)
        {
            try
            {
                Context.Reviews.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.InnerException?.Message ?? "DB Error" });
            }
        }

        [HttpPost("AddAll")]
        public JsonResult AddAll(CommonAddModel value)
        {
            try
            {
                if (value.Subjects != null)
                {
                    value.Subjects.ForEach(s => Context.Subjects.Add(s));
                    Context.SaveChanges();
                }

                if (value.Tracks != null)
                {
                    value.Tracks.ForEach(s => Context.Tracks.Add(s));
                    Context.SaveChanges();
                }

                if (value.Prepods != null)
                {
                    value.Prepods.ForEach(s => Context.Prepods.Add(s));
                    Context.SaveChanges();
                }

                if (value.Reviews != null)
                {
                    value.Reviews.ForEach(s => Context.Reviews.Add(s));
                    Context.SaveChanges();
                }
                return new JsonResult("");
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.InnerException?.Message ?? "DB Error" });
            }
        }
      
    }
}
