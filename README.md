# RFID UID Reader Project

This project implements a web-based interface for interacting with an RFID reader connected to an ESP32 microcontroller. It allows you to read RFID card UIDs through a browser using the Web Serial API.

## Project Structure

- `RFID_UUID_reader/RFID_UUID_reader.ino`: Arduino sketch for the ESP32 microcontroller
- `index.html`: Simple HTML interface for the web application
- `rfid-reader.js`: JavaScript class for managing the serial connection and processing RFID data

## Hardware Requirements

- ESP32 microcontroller board
- MFRC522 RFID reader module 
- RFID cards/tags
- USB cable for connecting the ESP32 to your computer

## Wiring

The ESP32 is connected to the MFRC522 RFID reader with the following pin connections:
- SS (SDA) pin connected to GPIO 5

*Note: For complete wiring details, refer to the original project at [Random Nerd Tutorials](https://RandomNerdTutorials.com/esp32-mfrc522-rfid-reader-arduino/).*

## Setup Instructions

### ESP32 Setup

1. Install the Arduino IDE if you haven't already.
2. Install ESP32 board support in Arduino IDE.
3. Install the "MFRC522v2" library via Arduino Library Manager.
4. Open the `RFID_UUID_reader.ino` sketch.
5. Upload the sketch to your ESP32 board.

### Web Interface Setup

1. Connect your ESP32 to your computer via USB.
2. Open `index.html` in a modern browser that supports the Web Serial API (Chrome, Edge).
3. Click the "Connect to RFID Reader" button.
4. Select your ESP32's serial port from the dialog.
5. Once connected, scan an RFID card to see its UID.

## Features

- Real-time RFID card detection and UID display
- Simple and intuitive web interface
- Easy serial connection management
- Compatible with any ESP32 board

## Browser Compatibility

The Web Serial API is currently supported in:
- Google Chrome 89+
- Microsoft Edge 89+
- Opera 76+

*Note: Firefox and Safari do not currently support the Web Serial API.*

## JavaScript API

The `RFIDReader` class provides the following main methods:

```javascript
// Create a new reader instance
const reader = new RFIDReader({
  baudRate: 115200,  // Optional, defaults to 115200
  onUidReceived: (uid) => console.log(uid)  // Callback when a card is read
});

// Connect to the reader
await reader.connect();

// Disconnect from the reader
await reader.disconnect();
```

## License

The original Arduino code is based on work by Rui Santos & Sara Santos from Random Nerd Tutorials and is licensed for free use with attribution.

## Acknowledgements

- RFID reader code based on the example from [Random Nerd Tutorials](https://RandomNerdTutorials.com/esp32-mfrc522-rfid-reader-arduino/)
- Uses the [MFRC522v2 library](https://github.com/OSSLibraries/Arduino_MFRC522v2)
