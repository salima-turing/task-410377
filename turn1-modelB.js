// Debounce
function debounce(func, delay) {
    let inDebounce;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

// Example usage: sensor data update
const sensorDataUpdate = () => {
    console.log('Sensor data updated.');
    // Perform data processing or send to server
};

const debouncedSensorUpdate = debounce(sensorDataUpdate, 500); // Call sensorDataUpdate after 500ms of no events

// Simulate sensor events
setInterval(() => {
    debouncedSensorUpdate();
}, 100); // Trigger event every 100ms

// Throttling
function throttle(func, delay) {
    let inThrottle;
    return function () {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = setTimeout(() => {
                inThrottle = false;
            }, delay);
        }
    };
}

// Example usage: sending periodic updates to server
const sendSensorDataToServer = () => {
    console.log('Sending sensor data to server.');
    // Send data to server
};

const throttledSendData = throttle(sendSensorDataToServer, 1000); // Call once per second

// Simulate sensor events
setInterval(() => {
    throttledSendData();
}, 100); // Trigger event every 100ms


// Asynchronous processing
// Simulate a slow asynchronous operation (sending data to server)
function sendDataAsync(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Data sent: ${data}`);
            resolve();
        }, 1000); // Simulate 1 second delay
    });
}

async function handleSensorEvent(eventData) {
    try {
        await sendDataAsync(eventData);
        console.log('Data processing completed.');
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

// Simulate sensor events
setInterval(() => {
    const eventData = 'Sensor data: ' + Math.random();
    handleSensorEvent(eventData);
}, 100); // Trigger event every 100ms
