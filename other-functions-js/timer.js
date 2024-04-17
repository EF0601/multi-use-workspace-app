let continueRunning = false;
//now includes clock
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

     //timer stuff
     if (continueRunning) {
          let currentTime = new Date().getTime();
          if (currentTime >= stopTime) {
               endTimer();
               clearTimer();
          }
          inputs.second--;
          if (inputs.second < 0) {
               inputs.second = 59;
               inputs.minute--;
          }
          if (inputs.minute < 0) {
               inputs.minute = 59;
               inputs.hour--;
          }
          updateDisplay();
     }
}

// Update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);

// Initialize the clock immediately
updateClock();


//Thank you ChatGPT :)

//timer
let hourDisplay =
     document.querySelector(".threeColumns").children[0].children[2];
let minuteDisplay =
     document.querySelector(".threeColumns").children[2].children[2];
let secondDisplay =
     document.querySelector(".threeColumns").children[4].children[2];

let inputs = {
     hour: 0,
     minute: 0,
     second: 0,

     stopwatchHour: 0,
     stopwatchMinute: 0,
     stopwatchSecond: 0,
};

let startTime = 0;
let stopTime = 0;

function clearTimer() {
     inputs.hour = 0;
     inputs.minute = 0;
     inputs.second = 0;
     updateDisplay();
}

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

     document.getElementById("stopwatchHour").textContent = addZeroes(inputs.stopwatchHour);
     document.getElementById("stopwatchMinute").textContent = addZeroes(inputs.stopwatchMinute);
     document.getElementById("stopwatchSecond").textContent = addZeroes(inputs.stopwatchSecond);
}

function startTimer() {
     document.getElementById("startTimerButton").disabled = true;
     document.getElementById("pauseTimerButton").disabled = false;
     document.getElementById("endTimerButton").disabled = false;
     continueRunning = true;
     startTime = new Date().getTime();
     stopTime = startTime + (inputs.hour * 3600000) + (inputs.minute * 60000) + (inputs.second * 1000);
     console.log(`Timer will end at ${stopTime}`);
}

const timerBackground = document.getElementById("uniqueTimer");
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

     let sound = new Audio("./alarmRingtone.mp3");
     sound.play();

     setTimeout(() => {
          timerBackground.style.backgroundColor = "red";
          banner.style.backgroundColor = "red";
          document.title = "Timer Ended!";
          clearTimer();
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

let stopwatchOn = false;
function startStopwatch() {
     updateDisplay();
     stopwatchOn = true;
     document.getElementById("startStopwatchButton").disabled = true;
     document.getElementById("endStopwatchButton").disabled = false;
     let interval = setInterval(() => {
          if (stopwatchOn == false) {
               clearInterval(interval);
          }
          else {
               inputs.stopwatchSecond++;
               if (inputs.stopwatchSecond === 60) {
                    inputs.stopwatchSecond = 0;
                    inputs.stopwatchMinute++;
               }
               if (inputs.stopwatchMinute === 60) {
                    inputs.stopwatchMinute = 0;
                    inputs.stopwatchHour++;
               }
               if (stopwatchOn == false) {
                    clearInterval(interval);
               }
               updateDisplay();
          }
     }, 1000);
}

function endStopwatch() {
     inputs.stopwatchHour = 0;
     inputs.stopwatchMinute = 0;
     inputs.stopwatchSecond = 0;
     // updateDisplay();
     stopwatchOn = false;
     document.getElementById("startStopwatchButton").disabled = false;
     document.getElementById("endStopwatchButton").disabled = true;
}
