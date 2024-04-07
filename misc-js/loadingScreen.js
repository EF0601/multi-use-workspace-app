// Get the modal
const modal = document.getElementById("loadingScreen");

modal.style.display = "block";

setTimeout(() => {
    document.getElementById("loadingScreenStatus").innerHTML = "Loaded! Welcome!";
    document.getElementById("loadingScreenBTN").style.display = "inline";
}, 6000);

document.getElementById("loadingScreenBTN").addEventListener("click", () => {
    modal.style.display = "none";
    console.clear();
});

const wifiCheckerSpan = document.getElementById("wifiDetector");

function checkConnection() {
    wifiCheckerSpan.style.cursor = "help";
    if (navigator.onLine) {
        wifiCheckerSpan.innerHTML = "online";
        wifiCheckerSpan.style.color = "green";
        wifiCheckerSpan.title = "This means that you will have access to wifi dependent services such as the weather app and calculator.";
    }
    else{
        wifiCheckerSpan.innerHTML = "offline";
        wifiCheckerSpan.style.color = "red";
        wifiCheckerSpan.title = "This means that you will not have access to wifi dependent services such as the weather app and calculator.";
    }
}

checkConnection();
