from websocket import create_connection
import json

def send_mess_client():
    try:
        ws = create_connection("ws://127.0.0.1:8000/ws/dashboard/")
        ws.send(json.dumps({
            "message": "message from backend"
        }))
        ws.close()
    except:
        pass

def main():
    send_mess_client()