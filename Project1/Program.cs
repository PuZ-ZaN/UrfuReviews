using Microsoft.EntityFrameworkCore;
using Project1;
using Project1.Data;

using static System.Net.Mime.MediaTypeNames;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEntityFrameworkNpgsql().AddDbContext<ApiDbContext>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("postgresConn")));

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

// Add services to the container.

var myAllowedSpecificOrigins = "_urfuReviewsSpecificOrigins";
//builder.Services.AddDbContext<ApiDbContext>();
builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddPolicy(myAllowedSpecificOrigins, policy =>
    {
        policy.WithOrigins("https://localhost:7044", "https://localhost:44414", "https://localhost:5044").AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(myAllowedSpecificOrigins);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapDefaultControllerRoute();

app.MapFallbackToFile("index.html");

app.Run();
