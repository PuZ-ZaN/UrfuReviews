using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public IEnumerable<Track> GetAllTracks(Guid? i, bool? isAdvanced)
        {
            if (Convert.ToBoolean(isAdvanced))
            {
                if (i is null)
                    return Context.Tracks.Include(t => t.Prepods);
                else
                    return Context.Tracks.Where(t => t.Id == i)
                                         .Include(t => t.Prepods);
            }

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
        public IEnumerable<Review> GetAllReviews(Guid? i, Int32? pageNumber, Guid? trackId, Guid? teacherId)
        {
            List<Review> reviews = Context.Reviews.ToList();
            const Int32 pageSize = 10;

            if (!(trackId is null))
            {
                var prepodsId = Context.Prepods.Where(teacher => teacher.TrackId == trackId).Select(teacher => teacher.Id).ToList();
                reviews = reviews.Where(review => prepodsId.Contains(review.PrepodId)).ToList();
            }
            if (!(teacherId is null))
            {
                reviews = reviews.Where(review => review.PrepodId == teacherId).ToList();
            }
            if (!(pageNumber is null))
            {
                reviews = reviews.Skip((pageNumber.GetValueOrDefault(1) - 1) * pageSize).Take(pageSize).ToList();
            }
            if (!(i is null))
            {
                reviews = Context.Reviews.Where(t => t.Id == i).ToList();
            }

            return reviews;
        }

        [HttpGet("All/{pageNumber?}")]
        public IEnumerable<Subject> GetAll(Int32? pageNumber, Int32? semester)
        {
            var Subjects = Context.Subjects.Where(subject => Convert.ToBoolean(semester) ? subject.Semester.Contains(Convert.ToInt32(semester)) : true)
                                           .Include(s => s.Tracks)
                                           .ThenInclude(t => t.Prepods)
                                           .ThenInclude(p => p.Reviews);

            if (pageNumber is null)
                return Subjects;

            const Int32 pageSize = 10;
            return Subjects.Skip((pageNumber.GetValueOrDefault(1) - 1) * pageSize).Take(pageSize);

        }

        [HttpGet("Search")]
        public IEnumerable<Track> Search(string text, string filteredBy)
        {
            var tracks = Context.Tracks.Where(track => filteredBy == "track" ? track.TrackName.ToLower().Contains(text) : true)
                                       .Include(t => t.Prepods)
                                       .ThenInclude(p => p.Reviews);

            return tracks.Where(track => filteredBy == "teacher" ? track.Prepods.Where(teacher => teacher.PrepodName.ToLower().Contains(text)).Count() != 0 : true);

        }

        /*[HttpGet("All2")]
        public CommonAddModel GetAll()
        {
            return new CommonAddModel()
            {
                Subjects = Context.Subjects.ToList(),
                Prepods = Context.Prepods.ToList(),
                Reviews = Context.Reviews.ToList(),
                Tracks = Context.Tracks.ToList(),
            };
        }*/



        [HttpPost("AddSubject")]
        public JsonResult AddSubject(Subject value)
        {
            try
            {
                Context.Subjects.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = ex.InnerException?.Message ?? "DB Error" });
            }
        }

        [HttpPost("AddTrack")]
        public JsonResult AddTrack(Track value)
        {
            try
            {
                Context.Tracks.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
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
