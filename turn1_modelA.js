// debounce
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage
const handleSensorData = debounce((data) => {
    console.log("Processed sensor data:", data);
}, 2000);

// Simulating sensor events firing quickly
setInterval(() => handleSensorData("Sensor data"), 100);


// throttling
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Usage
const logButtonClick = throttle(() => {
    console.log('Button clicked');
}, 1000);

// Simulating rapid button clicks
setInterval(logButtonClick, 200);

// asynchronous processing
async function fetchSensorData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log("Fetched sensor data:", data);
}

// Usage
setInterval(() => {
    fetchSensorData(); // Fetching data asynchronously without blocking
}, 3000);
