from backend.settings import MQTT_HOST, MQTT_PORT, MQTT_KEEPALIVE
import paho.mqtt.client as mqtt

class MQTTClient(mqtt.Client):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def on_connect(self, client, userdata, flags, rc):
        print("\nConnected with result code " + str(rc) + "\n")
        client.subscribe("measurements")

    def on_message(self, client, userdata, msg):
        message = msg.payload
        decoded_message = message.decode('utf-8')
        print(decoded_message)

    def create_client(self):
        self.on_connect = self.on_connect
        self.on_message = self.on_message
        self.connect(host=MQTT_HOST, port=MQTT_PORT, keepalive=MQTT_KEEPALIVE)
        print("Client created")
    
    def loop_start(self) -> int | None:
        return super().loop_start()

        