#Game list
Django, ReactJS, REST API

First clone or download from github, then :

1.CLIENT-SIDE

Install node dependencies.
- $cd gamelist/project
- $npm install

Build JS.
- $npm install -g gulp
- $cd gamelist/project
- $gulp build


2.SERVER-SIDE

Build database.
- $cd gamelist
- $python manage.py migrate

[Optional]Create superuser, remember your Username and Password
- $python manage.py createsuperuser


3.RUN SERVER
- $cd gamelist
- gamelist$ python manage.py runserver 0.0.0.0:8000

OR

- $cd project
- project$  npm run start

4.INFO

Open page on host:
- http://0.0.0.0:8000/project/

REST API end point :
- http://0.0.0.0:8000/project/games/
- http://0.0.0.0:8000/project/games/:id/
