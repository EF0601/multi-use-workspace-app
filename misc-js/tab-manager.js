function showAlert(message) {
    document.getElementById("alertBox").style.display = "block";
    document.getElementById("alertBoxText").textContent = message;
}

let tabs = {
    homeTab: document.getElementById('homeTab'),
    timerTab: document.getElementById('timerTab'),
    calculatorTab: document.getElementById('calculatorTab'),
    canvasTab: document.getElementById('canvasTab'),
    searchTab: document.getElementById('searchTab'),
    weatherTab: document.getElementById('weatherTab'),
};
let tabBtn = {
    homeTabBtn: document.getElementById('home_tab'),
    timerTabBtn: document.getElementById('timer_tab'),
    calculatorTabBtn: document.getElementById('calculator_tab'),
    canvasTabBtn: document.getElementById('canvas_tab'),
    searchTabBtn: document.getElementById('search_tab'),
    weatherTabBtn: document.getElementById('weather_tab'),
};

function closeAll() {
    tabs.homeTab.style.display = 'none';
    tabs.calculatorTab.style.display = 'none';
    tabs.canvasTab.style.display = 'none';
    tabs.searchTab.style.display = 'none';
    tabs.timerTab.style.display = 'none';
    tabs.weatherTab.style.display = 'none';
}

function openTab(tab) {
    closeAll();
    switch (tab) {
        case 'home':
            tabs.homeTab.style.display = 'block';
            break;
        case 'timer':
            tabs.timerTab.style.display = 'block';
            break;
        case 'calculator':
            tabs.calculatorTab.style.display = 'block';
            break;
        case 'canvas':
            tabs.canvasTab.style.display = 'block';
            break;
        case 'web explorer':
            tabs.searchTab.style.display = 'block';
            break;
        case 'weather':
            tabs.weatherTab.style.display = 'block';
            break;
        default:
            break;
    }
}

tabBtn.homeTabBtn.addEventListener('click', () => {
    openTab('home');
});
tabBtn.calculatorTabBtn.addEventListener('click', () => {
    openTab('calculator');
});
tabBtn.canvasTabBtn.addEventListener('click', () => {
    openTab('canvas');
});
tabBtn.searchTabBtn.addEventListener('click', () => {
    openTab('web explorer');
});
tabBtn.timerTabBtn.addEventListener('click', () => {
    openTab('timer');
});
tabBtn.weatherTabBtn.addEventListener('click', () => {
    openTab('weather');
});

tabBtn.canvasTabBtn.click();
setTimeout(() => {
    tabBtn.homeTabBtn.click();
}, 15);

setTimeout(() => {
    tabBtn.canvasTabBtn.click();
    setTimeout(() => {
        tabBtn.homeTabBtn.click();
    }, 15);
}, 5000);
