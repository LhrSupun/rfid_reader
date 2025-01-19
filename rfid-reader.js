class RFIDReader {
    constructor(options = {}) {
        this.port = null;
        this.reader = null;
        this.baudRate = options.baudRate || 115200;
        this.onUidReceived = options.onUidReceived || console.log;
        this.isReading = false;
    }

    async connect() {
        try {
            // Request port access
            this.port = await navigator.serial.requestPort();

            // Open the port
            await this.port.open({
                baudRate: this.baudRate,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
                flowControl: 'none'
            });

            console.log('Serial port connected successfully');
            this.startReading();
        } catch (error) {
            console.error('Failed to connect:', error);
            throw error;
        }
    }

    async startReading() {
        if (this.isReading) return;

        try {
            this.isReading = true;
            this.reader = this.port.readable.getReader();

            const decoder = new TextDecoder();
            let buffer = '';

            while (this.isReading) {
                const { value, done } = await this.reader.read();
                if (done) {
                    break;
                }

                // Decode the received data and add to buffer
                buffer += decoder.decode(value);

                // Process complete lines
                const lines = buffer.split('\n');
                buffer = lines.pop(); // Keep the incomplete line in the buffer

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    // console.log('Received:', trimmedLine);
                    // Check if the line is a hex UID
                    // if (/^[0-9A-Fa-f]+$/.test(trimmedLine)) {
                        this.onUidReceived(trimmedLine);
                    // }
                }
            }
        } catch (error) {
            console.error('Error reading:', error);
        } finally {
            this.isReading = false;
            if (this.reader) {
                this.reader.releaseLock();
            }
        }
    }

    async disconnect() {
        try {
            this.isReading = false;
            if (this.reader) {
                await this.reader.cancel();
                this.reader.releaseLock();
            }
            if (this.port) {
                await this.port.close();
                this.port = null;
            }
            console.log('Disconnected from serial port');
        } catch (error) {
            console.error('Error disconnecting:', error);
            throw error;
        }
    }
}

// Example usage:
// HTML: Add these buttons to your page
// <button id="connectBtn">Connect to RFID Reader</button>
// <button id="disconnectBtn">Disconnect</button>
// <div id="uidDisplay"></div>

document.addEventListener('DOMContentLoaded', () => {
    const rfidReader = new RFIDReader({
        onUidReceived: (uid) => {
            console.log('Card detected:', uid);
            document.getElementById('uidDisplay').textContent = `Latest UID: ${uid}`;
        }
    });

    document.getElementById('connectBtn')?.addEventListener('click', async () => {
        try {
            await rfidReader.connect();
        } catch (error) {
            console.error('Connection failed:', error);
        }
    });

    document.getElementById('disconnectBtn')?.addEventListener('click', async () => {
        try {
            await rfidReader.disconnect();
        } catch (error) {
            console.error('Disconnection failed:', error);
        }
    });
});