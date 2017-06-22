#Game list
Django, ReactJS, REST API

CLIENT-SIDE

Install node dependencies.
- $cd gamelist/project
- $npm install

Install gulp.
- $npm install -g gulp

Build JS.
- $cd gamelist
- $gulp build


SERVER-SIDE

Build database.
- $cd gamelist
- $python manage.py migrate

Create superuser, remember your Username and Password
- $python manage.py createsuperuser

Run server.
- $python manage.py runserver 0.0.0.0:8000

Open browser, Login to Admin, use your superuser credential created above
- http://0.0.0.0:8000/admin/
- Create 4 Tags : Kids , Racing, RGP, Shooting


Open page on host:
- http://0.0.0.0:8000/project/
(Add a new Game will fail if Tags are not created)

REST API end point :
- http://0.0.0.0:8000/project/games/
- http://0.0.0.0:8000/project/games/:id/
