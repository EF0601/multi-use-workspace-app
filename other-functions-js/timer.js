let hourDisplay =
     document.querySelector("#threeColumns").children[0].children[2];
let minuteDisplay =
     document.querySelector("#threeColumns").children[2].children[2];
let secondDisplay =
     document.querySelector("#threeColumns").children[4].children[2];

let inputs = {
     hour: 0,
     minute: 0,
     second: 0,
};

function changeTimer(type, number) {
     if (type === "hour") {
          if (!(parseInt(inputs.hour) + number < 0) && !(parseInt(inputs.hour) + number > 24)) {
               inputs.hour = inputs.hour + number;
               if (inputs.hour === 24) {
                    inputs.hour = 0;
               }
          }
     } else if (type === "minute") {
          if (!(parseInt(inputs.minute) + number < 0) && !(parseInt(inputs.minute) + number > 60)) {
               inputs.minute = inputs.minute + number;
               if (inputs.minute === 60) {
                    inputs.minute = 0;
               }
          }
     } else if (type === "second") {
          if (!(parseInt(inputs.second) + number < 0) && !(parseInt(inputs.second) + number > 60)) {
               inputs.second = inputs.second + number;
               if (inputs.second === 60) {
                    inputs.second = 0;
               }
          }
     }
     updateDisplay();
}

function addZeroes(num) {
     return String(num < 10 ? "0" + num : num);
}

function updateDisplay() {
     hourDisplay.innerHTML = addZeroes(inputs.hour);
     minuteDisplay.innerHTML = addZeroes(inputs.minute);
     secondDisplay.innerHTML = addZeroes(inputs.second);
}

let continueRunning;
function startTimer() {
     document.getElementById("startTimerButton").disabled = true;
     document.getElementById("pauseTimerButton").disabled = false;
     document.getElementById("endTimerButton").disabled = false;
     continueRunning = true;
     let interval = setInterval(() => {
          if (continueRunning == false) {
               clearInterval(interval);
          }
          else {
               if (inputs.second > 0) {
                    inputs.second--;
               } else if (inputs.minute > 0) {
                    inputs.minute--;
                    inputs.second = 59;
               } else if (inputs.hour > 0) {
                    inputs.hour--;
                    inputs.minute = 59;
                    inputs.second = 59;
               } else {
                    clearInterval(interval);
                    endTimer();
               }
               updateDisplay();
          }
     }, 1000);
}

const timerBackground = document.getElementById("timer");
const banner = document.getElementById("banner");

timerBackground.style.backgroundColor = "white";

function endTimer() {
     inputs.hour = 0;
     inputs.minute = 0;
     inputs.second = 0;
     updateDisplay();
     continueRunning = false;
     document.getElementById("startTimerButton").disabled = false;
     document.getElementById("pauseTimerButton").disabled = true;
     document.getElementById("endTimerButton").disabled = true;

     let sound = new Audio("./other-functions-js/alarmRingtone.mp3");
     sound.play();

     setTimeout(() => {
          timerBackground.style.backgroundColor = "red";
          banner.style.backgroundColor = "red";
          document.title = "Timer Ended!";
     }, 500);
     setTimeout(() => {
          timerBackground.style.backgroundColor = "white";
          banner.style.backgroundColor = "green";
          document.title = "Multi Usage Workspace Application";
     }, 1000);
     setTimeout(() => {
          timerBackground.style.backgroundColor = "red";
          banner.style.backgroundColor = "red";
          document.title = "Timer Ended!";
     }, 1500);
     setTimeout(() => {
          timerBackground.style.backgroundColor = "white";
          banner.style.backgroundColor = "green";
          document.title = "Multi Usage Workspace Application";
     }, 2000);
     setTimeout(() => {
          timerBackground.style.backgroundColor = "red";
          banner.style.backgroundColor = "red";
          document.title = "Timer Ended!";
     }, 2500);
     setTimeout(() => {
          timerBackground.style.backgroundColor = "white";
          banner.style.backgroundColor = "green";
          document.title = "Multi Usage Workspace Application";
     }, 3000);
     setTimeout(() => {
          timerBackground.style.backgroundColor = "red";
          banner.style.backgroundColor = "red";
          document.title = "Timer Ended!";
     }, 3500);
}

function pauseTimer() {
     continueRunning = false;
     document.getElementById("startTimerButton").disabled = false;
     document.getElementById("pauseTimerButton").disabled = true;
     document.getElementById("endTimerButton").disabled = true;
}

timerBackground.addEventListener("click", () => {
     if (timerBackground.style.backgroundColor == "red") {
          timerBackground.style.backgroundColor = "white";
          banner.style.backgroundColor = "green";
          document.title = "Multi Usage Workspace Application";
     }
});
banner.addEventListener("click", () => {
     if (timerBackground.style.backgroundColor == "red") {
          timerBackground.style.backgroundColor = "white";
          banner.style.backgroundColor = "green";
          document.title = "Multi Usage Workspace Application";
     }
});
