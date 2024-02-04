let timerInputLocations = {
    hour: document.getElementById('hour'),
    minute: document.getElementById('minute'),
    second: document.getElementById('second'),
};

let timerTimes = {
    hour: 0,
    number: 0,
    second: 0,
};

let timerEnd = true;
let timer = 0;

function setTimer() {
    if (timerInputLocations.hour.style.color == 'green' && timerInputLocations.minute.style.color == 'green' && timerInputLocations.second.style.color == 'green') {

        timerTimes.hour = Number(timerInputLocations.hour.value);
        timerTimes.minute = Number(timerInputLocations.minute.value);
        timerTimes.second = Number(timerInputLocations.second.value);
        timer = (timerTimes.hour * 3600) + (timerTimes.minute * 60) + (timerTimes.second);
        timerEnd = false;
    }
}

function HMS(timerInput) {
    if (isNaN(timerInput)) {
        return "Invalid input";
    }

    const hours = Math.floor(timerInput / 3600);
    const minutes = Math.floor((timerInput % 3600) / 60);
    const seconds = timerInput % 60;

    return `${hours}:${minutes}:${seconds}`;
}

function stopTimer() {
    timerEnd = true;
    timer = 0;
    document.getElementById('banner').style.backgroundColor = 'green';
}

setInterval(() => {
    if (timerEnd != true && timer > 0) {
        timer--;
        document.getElementById('timer').textContent = HMS(timer);
        if (timer === 0) {
            timerEnd = true;
            document.getElementById('banner').style.backgroundColor = 'red';
        }
    }
}, 1000);

document.getElementById('banner').addEventListener('click', () => {
    if (document.getElementById('banner').style.backgroundColor == 'red') {
        document.getElementById('banner').style.backgroundColor = 'green';
    }

});
