// Utility functions for debouncing and throttling
function debounce(func, delay) {
    let inDebounce;
    return function (...args) {
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, limit) {
    let lastTime;
    return function (...args) {
        const now = Date.now();
        if (!lastTime || (now - lastTime >= limit)) {
            lastTime = now;
            return func.apply(this, args);
        }
    };
}

// Asynchronous function to simulate sending sensor data
async function sendDataToServer(sensorData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Sent data to server: ${JSON.stringify(sensorData)}`);
            resolve();
        }, 500); // Simulated network delay
    });
}

// Mock sensor data updates
const motionSensorUpdate = debounce(async (data) => {
    console.log(`Processing motion: ${data}`);
    await sendDataToServer({ type: 'motion', value: data });
}, 1000); // Debounce for motion events (1 second)

const temperatureSensorUpdate = throttle(async (data) => {
    console.log(`Processing temperature: ${data}`);
    await sendDataToServer({ type: 'temperature', value: data });
}, 5000); // Throttle for temperature updates (5 seconds)

// Simulating sensor emissions
setInterval(() => {
    motionSensorUpdate('Motion detected!');
}, 200); // Emulate motion sensor triggering every 200ms

setInterval(() => {
    temperatureSensorUpdate(Math.random() * 100); // Simulate random temperature data
}, 1000); // Emulate temperature sensor read every second
