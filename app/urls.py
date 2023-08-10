from django.shortcuts import render
from django.urls import path, include
from .views import publish_message

urlpatterns = [
    path('', publish_message, name='publish_message')
]