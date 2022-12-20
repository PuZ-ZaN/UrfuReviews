@ECHO OFF
echo Drop database... (press y)
dotnet ef database drop
echo Remove migration...
dotnet ef migrations remove

echo Add migration...
dotnet ef migrations add "initial_migrations"
echo Update database...
dotnet ef database update