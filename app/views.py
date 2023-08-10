from django.shortcuts import render
from django.http import JsonResponse
from .client import MQTTClient

def publish_message(request):
    data = {}
    client = MQTTClient()
    client.create_client()
    return JsonResponse(data=data)
