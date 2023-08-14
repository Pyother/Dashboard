import paho.mqtt.client as mqtt
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio

class MQTTConsumer(AsyncWebsocketConsumer):

    # 1. Methods of AsyncWebsocketConsumer class:

    async def connect(self):
        await self.accept()
        await self.send(text_data="Backend -> Connection established")
        self.mqtt_messages = []
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.on_connect = self.on_connect
        self.mqtt_client.on_message = self.on_message
        self.mqtt_client.connect("localhost", 1883, 60)
        self.mqtt_client.loop_start()
        self.ws = None
        self.run_mqtt_listener = True  
        asyncio.ensure_future(self.mqtt_listener())  
        print("Backend -> LOOP STARTED")

    async def disconnect(self, close_code):
        self.mqtt_client.loop_stop()
        print("Backend -> LOOP STOPPED")

    # ----------------------------------------------------------------
    
    # 2. Methods to handle MQTT connection and messages:
                
    def on_connect(self, client, userdata, flags, rc):
        client.subscribe("measurements")
        print("Backend -> ✓ Client connected")

    def on_message(self, client, userdata, msg):
        message = msg.payload.decode("utf-8")
        print("Backend -> Received message: " + message)
        self.mqtt_messages.append(message)

    # ----------------------------------------------------------------

    # 3. Asynchronous task:

    async def mqtt_listener(self):
        while self.run_mqtt_listener:
            await asyncio.sleep(1)  
            if self.mqtt_messages:
                await self.send(text_data=self.mqtt_messages[0])
                self.mqtt_messages = []

    # ----------------------------------------------------------------
    




    
