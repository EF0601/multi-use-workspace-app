function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the time as HH:MM:SS
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Update the clock's content
    document.getElementById('clock').innerText = timeString;
    document.getElementById('clock2').innerText = timeString;
    if (document.getElementById('clock2').style.textDecoration == "underline") {
        document.getElementById('clock2').style.textDecoration = "none";
    }
    else {
        document.getElementById('clock2').style.textDecoration = "underline";
    }
}

// Update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);

// Initialize the clock immediately
updateClock();


//Thank you ChatGPT :)
