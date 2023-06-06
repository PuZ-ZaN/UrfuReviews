using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Project1.Auth;
using Project1.Data;
using Project1.Models;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Principal;
using System.Xml.Linq;

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
            var subjects = Context.Subjects;

            if (i is null)
                return subjects;
            else
                return subjects.Where(t => t.Id == i);
        }

        [HttpGet("Tracks/{i?}")]
        public IEnumerable<Track> GetAllTracks(Guid? i, bool? isAdvanced)
        {
            var tracks = Context.Tracks;

            if (Convert.ToBoolean(isAdvanced))
            {
                if (i is null)
                    return tracks.Include(t => t.Prepods);
                else
                    return tracks.Where(t => t.Id == i)
                                         .Include(t => t.Prepods);
            }

            if (i is null)
                return tracks;
            else
                return tracks.Where(t => t.Id == i);
        }

        [HttpGet("SubjectByTrackId/{trackId}")]
        public IActionResult GetSubjectByTrackId(Guid trackId)
        {
            Console.WriteLine(trackId);
            var track = GetAllTracks(trackId, false).FirstOrDefault();
            if ((track is null)) return BadRequest(new { errorText = "Invalid track ID" });


            var subjects = Context.Subjects.Where(subject => subject.Id == track.SubjectId)
                                           .Include(s => s.Tracks)
                                           .ThenInclude(t => t.Prepods);



            return new JsonResult(new { subject = subjects.FirstOrDefault() });
        }

        [HttpGet("Prepods/{i?}")]
        public IEnumerable<Prepod> GetAllPrepods(Guid? i)
        {
            var prepods = Context.Prepods;

            if (i is null)
                return prepods;
            else
                return prepods.Where(t => t.Id == i);
        }

        [HttpGet("Reviews/{i?}")]
        public IEnumerable<Review> GetAllReviews(Guid? i, Int32? limit, Guid? trackId, Guid? teacherId, string? sortedBy = "время")
        {
            IQueryable<Review> reviews = Context.Reviews;

            var reviewsList = reviews.ToList();

            if (!(sortedBy is null))
            {
                switch (sortedBy)
                {
                    case "общая оценка":
                        reviews = reviews.OrderByDescending(r => r.Rating).ThenByDescending(r => r.AddedDate);
                        break;
                    case "время":
                        reviews = reviews.OrderByDescending(r => r.AddedDate);
                        break;
                    case "полезность":
                        reviews = reviews.OrderByDescending(r => r.likes.Count - r.disLikes.Count).ThenByDescending(r => r.AddedDate);
                        break;
                }
            }


            if (!(trackId is null))
            {
                var prepodsId = Context.Prepods.Where(teacher => teacher.TrackId == trackId).Select(teacher => teacher.Id);
                reviews = reviews.Where(review => prepodsId.Contains(review.PrepodId));
            }
            if (!(teacherId is null))
            {
                reviews = reviews.Where(review => review.PrepodId == teacherId);
            }
            if (!(limit is null))
            {
                reviews = reviews.Take(limit.GetValueOrDefault(1));
            }
            if (!(i is null))
            {
                reviews = reviews.Where(t => t.Id == i);
            }

            return reviews;
        }

        [HttpGet("All/count")]
        public Int32 GetAllCount(Int32? semester)
        {
            var Subjects = Context.Subjects.Where(subject => Convert.ToBoolean(semester) ? subject.Semester.Contains(Convert.ToInt32(semester)) : true);

            return Subjects.Count();

        }

        [HttpGet("All/")]
        public IEnumerable<Subject> GetAll(Int32? limit, Int32? semester)
        {
            var Subjects = Context.Subjects.Where(subject => Convert.ToBoolean(semester) ? subject.Semester.Contains(Convert.ToInt32(semester)) : true)
                                           .Include(s => s.Tracks)
                                           .ThenInclude(t => t.Prepods)
                                           .OrderBy(subject => subject.AddedDate);                               

            if (limit is null)
                return Subjects;

            return Subjects.Take(limit.GetValueOrDefault(1));

        }

        [HttpGet("Search")]
        public IEnumerable<Track> Search(string text, string filteredBy)
        {
            IQueryable<Track> tracks = Context.Tracks;

            tracks = tracks.Where(track => filteredBy == "track" ? track.TrackName.ToLower().Contains(text.ToLower()) : true)
                           .Include(t => t.Prepods)
                           .OrderBy(track => track.AddedDate);

            tracks = tracks.Where(track => filteredBy == "teacher" ? 
                                  track.Prepods.Where(teacher => teacher.PrepodName.ToLower().Contains(text.ToLower())).Count() != 0 
                                  : true);

            return tracks;

        }

        [HttpGet("SearchSubjects")]
        public IEnumerable<Subject> SearchSubjects(string? text, Guid? id)
        {
            IQueryable<Subject> subjects = Context.Subjects
                                                  .Include(s => s.Tracks)
                                                  .ThenInclude(t => t.Prepods)
                                                  .OrderBy(subject => subject.AddedDate);

            if (!(id is null))
            {
                subjects = subjects.Where(subject => subject.Id == id);
            }
            else if (!(text is null))
            {
                subjects = subjects.Where(subject => subject.SubjectName.ToLower().Contains(text.ToLower()));
            }

            return subjects;

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


        [Authorize(Roles = "User")]
        [HttpPost("AddSubject")]
        public IActionResult AddSubject(Subject value)
        {
            try
            {
                Context.Subjects.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [Authorize(Roles = "User")]
        [HttpPost("AddTrack")]
        public IActionResult AddTrack(Track value)
        {
            try
            {
                Context.Tracks.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
        [Authorize(Roles = "User")]
        [HttpPost("AddPrepod")]
        public IActionResult AddPrepod(Prepod value)
        {
            try
            {
                Context.Prepods.Add(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
        [Authorize(Roles = "User")]
        [HttpPost("AddReview")]
        public IActionResult AddReview(Review value)
        {
            if (value.userName == "") // убрать проверку в продакшне
            {
                string userName = getUserName();
                if (userName == "Invalid token")
                    return BadRequest(new { errorText = "Invalid token" });

                value.userName = userName;
            }

            try
            {
                Context.Reviews.Add(value);
                calculateNewValueTeacher(value);
                Context.SaveChanges();
                return new JsonResult(new { value.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }


        [Authorize(Roles = "User")]
        [HttpPost("ChangeRatingReview")]
        public IActionResult ChangeRatingReview([FromBody] JObject data)
        {
            Review review = data["review"].ToObject<Review>();
            Boolean isLike = data["isLike"].ToObject<Boolean>();

            IQueryable<Review> reviews = Context.Reviews;
            Review reviewInDB = reviews.FirstOrDefault(rev => review.Id == rev.Id);

            string userName = getUserName();
            if (userName == "Invalid token")
                return BadRequest(new { errorText = "Invalid token" });

            if (reviewInDB.userName == userName)
                return BadRequest(new { errorText = "Author review equals user" });

            if (reviewInDB.likes.Contains(userName) || reviewInDB.disLikes.Contains(userName))
                return BadRequest(new { errorText = "Author already appreciated the review" });

            if (isLike)
            {
                reviewInDB.likes.Add(userName);
            }
            else
            {
                reviewInDB.disLikes.Add(userName);
            }

            Context.SaveChanges();

            return new JsonResult(reviewInDB);
        }

        public string getUserName()
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            string userName = "";

            try
            {
                var handler = new JwtSecurityTokenHandler();

                // валидация токена

                var jwtSecurityToken = handler.ReadJwtToken(token);
                var validationParameters = AuthValidation.GetValidationParameters();

                SecurityToken validatedToken;
                IPrincipal principal = handler.ValidateToken(token, validationParameters, out validatedToken);

                // получение userName

                var claims = jwtSecurityToken.Claims.ToList();
                userName = claims.FirstOrDefault(claim => claim.Type.Contains("name")).Value;
            }
            catch (Exception ex)
            {
                return "Invalid token";
            }

            return userName;
        }

        public void calculateNewValueTeacher(Review newReview)
        {
            var reviews = Context.Reviews.Where(review => review.PrepodId == newReview.PrepodId).ToList();
            reviews.Add(newReview);
            var teacher = Context.Prepods.Where(prepod => prepod.Id == newReview.PrepodId).FirstOrDefault();
            var countReviews = reviews.Count();
            var values = new Values();

            // group by

            for (var i = 0; i < countReviews; i++)
            {
                var review = reviews[i];
                switch (review.Rating)
                {
                    case 1:
                        values.count1++;
                        break;
                    case 2:
                        values.count2++;
                        break;
                    case 3:
                        values.count3++;
                        break;
                    case 4:
                        values.count4++;
                        break;
                    case 5:
                        values.count5++;
                        break;
                }
                values.avgRating += review.Rating;
                values.avgInterest += review.Interest;
                values.avgBenefit += review.Benefit;
                values.avgAvailability += review.Availability;
            }

            values.avgRating = Math.Round(values.avgRating / (double)countReviews, 1);
            values.avgInterest = Math.Round(values.avgInterest / (double)countReviews, 1);
            values.avgBenefit = Math.Round(values.avgBenefit / (double)countReviews, 1);
            values.avgAvailability = Math.Round(values.avgAvailability / (double)countReviews, 1);
            values.countReviews = countReviews;

            teacher.Values = values;
        }

        [Authorize(Roles = "User")]
        [HttpPost("AddAll")]
        public IActionResult AddAll(CommonAddModel value)
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
                return StatusCode(500);
            }
        }

    }
}
