from django.core.asgi import get_asgi_application
from .consumers import MqttConsumer
from channels.routing import ProtocolTypeRouter, ChannelNameRouter, URLRouter
from channels.auth import AuthMiddlewareStack

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "channel": ChannelNameRouter(
        {
            "mqtt.pub": MqttConsumer.as_asgi()
        }
    )
})