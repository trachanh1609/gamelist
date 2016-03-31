from django.conf.urls import include, url
from django.views.generic.base import RedirectView
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^project/', include('project.urls')),
    url(r'^.*$', RedirectView.as_view(url='/project/', permanent=False)),
]
