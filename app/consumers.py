import json
import time
import paho.mqtt.client as mqtt
from channels.generic.websocket import AsyncWebsocketConsumer

class MQTTConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data="Backend -> Connection established")
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.on_connect = self.on_connect
        self.mqtt_client.on_message = self.on_message
        self.mqtt_client.connect("localhost", 1883, 60)
        self.mqtt_client.loop_start()
        print("Backend -> LOOP STARTED")

    async def receive(self, text_data=None, bytes_data=None):
        await self.send(text_data="New message received!")

    def on_connect(self, client, userdata, flags, rc):
        client.subscribe("measurements")
        print("Backend -> ✓ Client connected")

    def on_message(self, client, userdata, msg):
        message = msg.payload.decode("utf-8")
        self.send(text_data=json.dumps({
            "type": "mqtt_message",
            "message": message
        }))
        print("Backend -> Received message: " + message)

    async def disconnect(self, close_code):
        self.mqtt_client.loop_stop()
        print("Backend -> LOOP STOPPED")

    
