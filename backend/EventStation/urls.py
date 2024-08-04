from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'EventStation'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('event_info/',views.event_info,name='event_info'),
    path('unapproved_event/',views.get_unapproved,name='unapproved_event'),
    path('event_add/',views.event_add,name='event_add'),
    path('event_details/',views.event_details,name='event_details'),
    path('register_event/', views.register_for_event, name='register_event'),
    path('homepage/',views.get_events,name='homepage'),
    path('approve_by_mentor/', views.approve_by_mentor, name='approve_by_mentor'),
    path('approve_by_hod/', views.approve_by_hod, name='approve_by_hod'),
    path('approve_by_dean/', views.approve_by_dean, name='approve_by_dean'),
    
]
