import websocket

url = "ws://localhost:8000/ws/dashboard/"
ws = websocket.create_connection(url)

try:
    while True:
        message = input("Enter a message to send: ")
        ws.send(message)
except KeyboardInterrupt:
    pass
finally:
    ws.close()
