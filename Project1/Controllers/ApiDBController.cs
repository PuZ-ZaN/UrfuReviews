using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Project1.Auth;
using Project1.Data;
using Project1.Email;
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
        private readonly IEmailSender _emailSender;

        public ApiDBController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        [HttpGet("Email")]
        public async Task<IActionResult> Test()
        {
            try
            {
                var receiver = "Evgeny.Streltsov@urfu.me";
                var subject = "Test";
                var message = "It's a test message! ";

                await _emailSender.SendEmailAsync(receiver, subject, message);
                return StatusCode(200);
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

        }

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

            // сокрытие userName;

            foreach (Review review in reviews)
            {
                review.user = review.isAnonym ? null : review.user;
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

        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
        [HttpGet("BadReviews/{i?}")]
        public IEnumerable<Review> GetBadReviews(Guid? i, Int32? limit)
        {
            IQueryable<Review> reviews = Context.Reviews;

            reviews = reviews.Where(review => review.disLikes.Count > review.likes.Count)
                             .OrderByDescending(r => r.likes.Count - r.disLikes.Count)
                             .ThenByDescending(r => r.AddedDate);

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


        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "User, Admin")]
        [HttpPost("AddReview")]
        public IActionResult AddReview(Review value)
        {
            PersonReview user = getUserReview();
            Console.WriteLine(user.id);
            if (user.id == Guid.Empty)
                return BadRequest(new { errorText = "Invalid token" });

            value.user = user;

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


        [Authorize(Roles = "User, Admin")]
        [HttpPost("ChangeRatingReview")]
        public IActionResult ChangeRatingReview([FromBody] JObject data)
        {
            Review review = data["review"].ToObject<Review>();
            Boolean isLike = data["isLike"].ToObject<Boolean>();

            IQueryable<Review> reviews = Context.Reviews;
            Review reviewInDB = reviews.FirstOrDefault(rev => review.Id == rev.Id);

            PersonReview user = getUserReview();
            if (user.id == Guid.Empty)
                return BadRequest(new { errorText = "Invalid token" });

            if (reviewInDB.user.id == user.id)
                return BadRequest(new { errorText = "Author review equals user" });

            if (reviewInDB.likes.Contains(user.id) || reviewInDB.disLikes.Contains(user.id))
                return BadRequest(new { errorText = "Author already appreciated the review" });

            if (isLike)
            {
                reviewInDB.likes.Add(user.id);
            }
            else
            {
                reviewInDB.disLikes.Add(user.id);
            }

            Context.SaveChanges();

            reviewInDB.user = reviewInDB.isAnonym ? null : reviewInDB.user;
            return new JsonResult(reviewInDB);
        }

        public PersonReview getUserReview()
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            PersonReview user = new() { };

            Console.WriteLine("QQQQQQ");

            try
            {
                var handler = new JwtSecurityTokenHandler();

                // валидация токена

                var jwtSecurityToken = handler.ReadJwtToken(token);
                var validationParameters = AuthValidation.GetValidationParameters();

                SecurityToken validatedToken;
                IPrincipal principal = handler.ValidateToken(token, validationParameters, out validatedToken);

                // получение user полей

                var claims = jwtSecurityToken.Claims.ToList();
                user.name = claims.FirstOrDefault(claim => claim.Type.Contains("name")).Value;
                user.id = new Guid(claims.FirstOrDefault(claim => claim.Type.Contains("userdata")).Value);
                foreach (var claim in claims)
                {
                    Console.WriteLine(claim.Type);
                }
            }
            
            catch (Exception ex)
            {
                return user;
            }

            return user;
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

        [Authorize(Roles = "Admin")]
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
