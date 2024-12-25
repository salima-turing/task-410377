// Debounce function
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

// Throttle function
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

// Asynchronous functions (simulating sensor events and data processing)
const processMotionEvent = async () => {
    console.log('Motion detected. Processing event...');
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log('Motion event processed.');
};

const sendTemperatureDataAsync = async (data) => {
    console.log(`Sending temperature data: ${data}`);
    // Simulate sending to server
    await new Promise((resolve) => setTimeout(resolve, 500));
};

const sendHumidityDataAsync = async (data) => {
    console.log(`Sending humidity data: ${data}`);
    // Simulate sending to server
    await new Promise((resolve) => setTimeout(resolve, 500));
};

// Event handlers
const motionSensorEvent = () => {
    const debouncedMotionEvent = debounce(processMotionEvent, 300); // Debounce motion event for 300ms
    debouncedMotionEvent();
};

const temperatureSensorEvent = (tempData) => {
    const throttledTempSend = throttle(() => {
        sendTemperatureDataAsync(tempData);
    }, 10000); // Throttle temperature data send to once every 10 seconds
    throttledTempSend();
};

const humiditySensorEvent = (humidityData) => {
    const throttledHumidSend = throttle(() => {
        sendHumidityDataAsync(humidityData);
    }, 10000); // Throttle humidity data send to once every 10 seconds
    throttledHumidSend();
};

// Simulate sensor events
setInterval(() => {
    motionSensorEvent(); // Motion sensor triggered randomly
}, Math.floor(Math.random() * 1000) + 100); // Motion event every 1-1100ms

setInterval(() => {
    const tempData = `${Math.random() * 25 + 20}.°C`;
    temperatureSensorEvent(tempData); // Temperature sensor triggers every 500ms
}, 500);

setInterval(() => {
    const humidityData = `${Math.random() * 100}.%`;
    humiditySensorEvent(humidityData); // Humidity sensor triggers every 500ms
}, 500);
