from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path, re_path
from . import consumers

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path("ws/dashboard/", consumers.MQTTConsumer.as_asgi()),
    ]),
})
