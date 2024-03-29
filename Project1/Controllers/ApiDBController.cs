﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Project1.Auth;
using Project1.Data;
using Project1.Email;
using Project1.Models;
using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Principal;
using System.Xml.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Project1.Controllers
{
    [ApiController]
    [Route("api")]
    public class ApiDBController : ControllerBase
    {
        protected ApiDbContext Context => HttpContext.RequestServices.GetService(typeof(ApiDbContext)) as ApiDbContext;
        IWebHostEnvironment AppEnvironment;
        private readonly IEmailSender _emailSender;

        public ApiDBController(IEmailSender emailSender, IWebHostEnvironment appEnvironment)
        {
            _emailSender = emailSender;
            AppEnvironment = appEnvironment;
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
                                 .Include(t => t.Prepods.OrderByDescending(r => r.AddedDate));
            }

            if (i is null)
                return tracks;
            else
                return tracks.Where(t => t.Id == i);
        }

        [HttpGet("SubjectByTrackId/{trackId}")]
        public IActionResult GetSubjectByTrackId(Guid trackId)
        {
            var track = GetAllTracks(trackId, false).FirstOrDefault();
            if ((track is null)) return BadRequest(new { errorText = "Invalid track ID" });


            var subjects = Context.Subjects.Where(subject => subject.Id == track.SubjectId)
                                           .Include(s => s.Tracks)
                                           .ThenInclude(t => t.Prepods.OrderByDescending(r => r.AddedDate));    



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
                                           .Include(s => s.Tracks.OrderBy(t => t.AddedDate))
                                           .ThenInclude(t => t.Prepods.OrderByDescending(r => r.AddedDate))
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
        public IEnumerable<Review> GetBadReviews(Guid? i, Guid? userId, Int32? limit = 999)
        {
            IQueryable<Review> reviews = Context.Reviews;

            reviews = reviews.Where(review => review.disLikes.Count > review.likes.Count);
            if (!(userId is null))
            {
                reviews = reviews.Where(review => review.user.id == userId);
            }

            reviews = reviews.OrderBy(r => r.likes.Count - r.disLikes.Count)
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
        [HttpDelete("DeleteReview/{i?}")]
        public IActionResult DeleteReview(Guid? i)
        {
            IQueryable<Review> reviews = Context.Reviews;
            var review = reviews.FirstOrDefault(r => r.Id == i);
            if (review is null)
            {
                    return StatusCode(404);
            }

            try
            {
                Context.Reviews.Remove(review);
                Context.SaveChanges();
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPost("BlockUser/{i?}")]
        public IActionResult BlockUser(Guid? i)
        {
            IQueryable<Person> persons = Context.Person;
            var person = persons.FirstOrDefault(r => r.Id == i);

            if (person is null)
            {
                return StatusCode(404);
            }

            try
            {
                person.isBlocked = true;
                Context.SaveChanges();
                return StatusCode(200);
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPost("AddSubject")]
        public async Task<IActionResult> AddSubject([FromForm] SubjectViewModel value)
        {
            Subject subject = new Subject { Semester = value.Semester, SubjectName = value.SubjectName };
            // hide in prod
            if (value.Id != null) subject.Id = value.Id;
            if (value.AddedDate != null) subject.AddedDate = value.AddedDate;

            try
            {
                var picture = value.Picture;
                if (picture != null)
                {
                    var path = SavePictureAndGetPath(picture).Result.ToString();
                    subject.PicturePath = path;
                }
                Context.Subjects.Add(subject);
                Context.SaveChanges();
                return new JsonResult(new { subject.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        public async Task<string> SavePictureAndGetPath(IFormFile picture)
        {
            string path = "/Files/" + Guid.NewGuid().ToString() + "_" + picture.FileName;
            // сохраняем файл в папку Files в каталоге wwwroot
            using (var fileStream = new FileStream(AppEnvironment.WebRootPath + path, FileMode.Create))
            {
                await picture.CopyToAsync(fileStream);
            }
            return path;
        }

        public void DeletePicture(string path)
        {
            if (System.IO.File.Exists($"wwwroot{path}"))
            {
                System.IO.File.Delete($"wwwroot{path}");
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpPatch("UpdateSubject")]
        public IActionResult UpdateSubject([FromForm] SubjectViewModel value)
        {
            var subjectId = value.Id;
            try
            {
                var subject = Context.Subjects.FirstOrDefault(s => s.Id == subjectId);
                if (subject == null)
                {
                    return NotFound(new { errorText = "Subject with current id doesn't exist" });
                }

                if (value.SubjectName != null)
                {
                    subject.SubjectName = value.SubjectName;
                }
                if (value.Semester != null)
                {
                    subject.Semester = value.Semester;
                }
                if (value.Picture != null)
                {
                    if (subject.PicturePath != "") DeletePicture(subject.PicturePath);

                    subject.PicturePath = SavePictureAndGetPath(value.Picture).Result.ToString();
                }
                subject.UpdatedDate = DateTime.UtcNow;

                Context.SaveChanges();
                return Ok("Subject Updated");
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

                Prepod defaultTeacher = new Prepod
                {
                    TrackId = value.Id,
                    PrepodName = "Нет нужного/онлайн курс",
                };
                Context.Prepods.Add(defaultTeacher);

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
