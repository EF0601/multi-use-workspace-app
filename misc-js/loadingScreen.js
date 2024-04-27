// Get the modal
const modal = document.getElementById("loadingScreen");

// modal.style.display = "block";

setTimeout(() => {
    document.getElementById("loadingScreenStatus").innerHTML = "Loaded! Welcome!";
    document.getElementById("loadingScreenEnd").style.display = "inline";
}, 6000);

document.getElementById("loadingScreenBTN").addEventListener("click", () => {
    modal.style.display = "none";
    // console.clear();
    console.log("HEY THERE! READING THIS? YOU MIGHT BE ON YOUR WAY TO BECOME A TECH DEVELOPER!");
    console.log("MESSING AROUND HERE CAN POTENTIALLY DESTROY THE APP. YOU DON'T WANT THAT, RIGHT?");
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
