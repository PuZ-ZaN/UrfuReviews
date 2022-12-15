using Microsoft.EntityFrameworkCore;

using Project1.Models;

namespace Project1.Data
{

    public class ApiDbContext : DbContext
    {
        public virtual DbSet<Prepod> Prepods { get; set; }
        public virtual DbSet<Track> Tracks { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }

        public virtual DbSet<Review> Reviews { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //ебать сука пиздец, тут черт ногу сломит, связи ебать
            base.OnModelCreating(modelBuilder);
            //Один предмет - много треков
            modelBuilder.Entity<Track>(entity =>
            {
                entity.HasOne(d => d.Subject)
                .WithMany(p => p.Tracks)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Tracks_Subject");
            });
            //Один трек - много преподов
            modelBuilder.Entity<Prepod>(entity =>
            {
                entity.HasOne(d => d.Track)
                .WithMany(p => p.Prepods)
                .HasForeignKey(d => d.TrackId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Prepods_Track");
            });
            //Один препод - много отзывов
            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasOne(d => d.Prepod)
                .WithMany(p => p.Reviews)
                .HasForeignKey(d => d.PrepodId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Reviews_Prepods");
            });
        }
        
    }
}