// Get the modal
const settings = document.getElementById("settings");

// Get the button that opens the modal
const SettingsBTN = document.getElementById("SettingsBTN");

// Get the <span> element that closes the modal
const SettingsClose = document.getElementById("SettingsClose");

// When the user clicks on the button, open the modal
SettingsBTN.onclick = function () {
    settings.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
SettingsClose.onclick = function () {
    settings.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == settings) {
        settings.style.display = "none";
    }
};

// Get the modal
const help = document.getElementById("help");

// Get the button that opens the modal
const helpBTN = document.getElementById("HelpBTN");

// Get the <span> element that closes the modal
const HelpClose = document.getElementById("HelpClose");

// When the user clicks on the button, open the modal
helpBTN.onclick = function () {
    help.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
HelpClose.onclick = function () {
    help.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == help) {
        help.style.display = "none";
    }
};
