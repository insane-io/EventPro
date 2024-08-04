
from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
# import settings

urlpatterns = [
    path('administration/', admin.site.urls),
    path('admin/', include('AdminStation.urls')),
    path('', TemplateView.as_view(template_name="index.html")),
    path('authentication/', include('AuthenticationHub.urls')),
    path('user/', include('UserprofileStation.urls')),
    path('event/', include('EventStation.urls')),
    path('venue/', include('VenueStation.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)