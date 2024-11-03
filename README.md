# Dashboard

This application serves as a universal tool for fully utilizing a vehicle's capabilities. It is the sole interface for controlling the vehicle, providing real-time access to statistics and visualizations of data collected by the onboard device. Through a clear and user-friendly interface, users can manage the vehicle's movement and monitor environmental factors as conditions change.

## Features

| Feature                      | Description                                                                                     |
|------------------------------|-------------------------------------------------------------------------------------------------|
| **Control Panel**            | Allows real-time control of the vehicle’s movement via an intuitive interface or keyboard.      |
| **Statistics Panel**         | Displays real-time data visualizations, including WiFi signal strength, position, and air quality. |
| **Communication Protocols**  | Uses MQTT for device communication and WebSocket for frontend-backend message exchange.         |

## Technical Overview

- **Frontend**: Provides a control panel and data visualization in the browser.
- **Backend**: Manages communication with the device and relays control commands and sensor data.
- **Protocols**: MQTT for device communication; WebSocket for frontend-backend integration.

## Visualization

![Application Dashboard](https://github.com/user-attachments/assets/51d86b1b-638a-49d1-b5e2-bb0ef8355f82)

*Application control and monitoring dashboard with data visualization.*

---

> **Note**: This application is designed for local use via a web browser on a personal computer. It supports keyboard controls and button-click inputs for ease of operation.

