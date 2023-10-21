let inputLocations = {
    hour: document.getElementById('hour'),
    minute: document.getElementById('minute'),
    second: document.getElementById('second'),
};

let inputsNumbers = {
    hour: 0,
    minute: 0,
    second: 0,
};

function remindAlert() {
    document.getElementById('timerAlerts').textContent = "Unrecognized input, LINE 14, checker.js. Think you have a valid input? Contact support! Code: MUWA/T/C/14";
    setTimeout(() => {
        document.getElementById('timerAlerts').textContent = "No warnings yet.";
    }, 500);
}


function checker(inputName) {
    switch (inputName) {
        case 'hour':
            if (inputLocations.hour.value == "") {
                inputLocations.hour.value = "0";
            }
            if (inputLocations.hour.value != null && !isNaN(Number(inputLocations.hour.value)) && Number(inputLocations.hour.value) >= 0 && Number(inputLocations.hour.value) <= 23) {
                inputLocations.hour.style.color = 'green';
            }
            else{
                inputLocations.hour.style.color = 'red';
                inputLocations.hour.value = "0";
                remindAlert();
            }

            break;
        case 'minute':
            if (inputLocations.minute.value == "") {
                inputLocations.minute.value = "0";
            }
            if (inputLocations.minute.value != null && !isNaN(Number(inputLocations.minute.value))&& Number(inputLocations.minute.value) >= 0 && Number(inputLocations.minute.value) <= 59) {
                inputLocations.minute.style.color = 'green';
            }
            else {
                inputLocations.minute.style.color = 'red';
                inputLocations.minute.value = "0";
                remindAlert();
            }

            break;
        case 'second':
            if (inputLocations.second.value == "") {
                inputLocations.second.value = "0";
            }
            if (inputLocations.second.value != null && !isNaN(Number(inputLocations.second.value)) && Number(inputLocations.second.value) >= 0 && Number(inputLocations.second.value) <= 59) {
                inputLocations.second.style.color = 'green';
            }
            else {
                inputLocations.second.style.color = 'red';
                inputLocations.second.value = "0";
                remindAlert();
            }

            break;

        default:
            break;
    }
}
