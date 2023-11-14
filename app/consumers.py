import paho.mqtt.client as mqtt
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import json

class MQTTConsumer(AsyncWebsocketConsumer):

    # 1. Methods of AsyncWebsocketConsumer class:
    
    async def connect(self):
        await self.accept()
        await self.send(text_data="Start")
        self.mqtt_messages = []
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.on_connect = self.on_connect
        self.mqtt_client.on_message = self.on_message
        self.mqtt_client.connect("test.mosquitto.org", 1883, 60)
        self.mqtt_client.loop_start()
        self.ws = None
        self.run_mqtt_listener = True 
        asyncio.ensure_future(self.mqtt_listener())
        print("Backend -> LOOP STARTED")

    async def receive(self, text_data):
        print("Message recived on WebSockets: " + text_data)
        self.mqtt_client.publish(topic="AreaExplorer", payload=text_data)

    async def disconnect(self, close_code):
        self.mqtt_client.loop_stop()
        print("Backend -> LOOP STOPPED")

    # ----------------------------------------------------------------
    
    # 2. Methods to handle MQTT connection and messages:
    
    def on_connect(self, client, userdata, flags, rc):
        client.subscribe("AreaExplorer")
        print("Backend -> ✓ Client connected")

    def on_message(self, client, userdata, msg):
        message = msg.payload.decode("utf-8")
        print("Backend -> Received message: " + message)

        # Speedtest callback handling:
        if "wifitest_callback" in message:
            print("Speedtest callback received: ")
            essid = ((message.split("|"))[1].split(":"))[0]
            signal_level = ((message.split("|"))[1].split(":"))[1]

            print("Signal level: " + signal_level)

            data = {
                'position': {
                    'x': 'null',
                    'y': 'null',
                },
                'speedtest': {
                    'signal_level': float(signal_level),
                    'megabits_upload': float(1),
                },
                'carbon_monoxide_measurement': {
                    'density': 'null',
                },
                'methane_measurement': {
                    'density': 'null',
                }
            }
            message = 'Data_callback|' + str(data)
        # ---------------------------------------------------------------

        # Drive callback handling:
        if "drive_callback" in message:
            pass
        # ---------------------------------------------------------------

        # Carbon monoxide measurement callback handling:
        if "carbon_monoxide_callback" in message:
            print("Carbon monoxide measurement callback received")
            parts = message.split(":")
            carbon_monoxide_density = parts[1]
            print(carbon_monoxide_density)
            data = {
                'position': {
                    'x': 'null',
                    'y': 'null',
                },
                'speedtest': {
                    'megabits_download': 'null',
                    'megabits_upload': 'null',
                },
                'carbon_monoxide_measurement': {
                    'density': float(carbon_monoxide_density),
                },
                'methane_measurement': {
                    'density': 'null',
                }
            }
            message = 'Data_callback|' + str(data)
        # ---------------------------------------------------------------

        # Methane measurement callback handling:
        if "methane_callback" in message:
            print("Methane measurement callback received")
            parts = message.split(":")
            methane_density = parts[1]
            print(methane_density)
            data = {
                'position': {
                    'x': 'null',
                    'y': 'null',
                },
                'speedtest': {
                    'megabits_download': 'null',
                    'megabits_upload': 'null',
                },
                'carbon_monoxide_measurement': {
                    'density': 'null',
                },
                'methane_measurement': {
                    'density': float(methane_density),
                }
            }
            message = 'Data_callback|' + str(data)
        # ---------------------------------------------------------------

        if len(self.mqtt_messages) != 0: 
            self.mqtt_messages.clear()
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
    




    
