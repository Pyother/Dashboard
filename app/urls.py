from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    #path('dashboard/', views.dashboard, name='dashboard'),
    path('dashboard/', TemplateView.as_view(template_name='index.html'), name='dashboard')
]
