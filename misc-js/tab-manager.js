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
};
let tabBtn = {
    homeTabBtn: document.getElementById('home_tab'),
    timerTabBtn: document.getElementById('timer_tab'),
    calculatorTabBtn: document.getElementById('calculator_tab'),
    canvasTabBtn: document.getElementById('canvas_tab'),
    searchTabBtn: document.getElementById('search_tab'),
};

tabBtn.homeTabBtn.addEventListener('click', () => {
    tabs.homeTab.style.display = 'block';
    tabs.calculatorTab.style.display = 'none';
    tabs.canvasTab.style.display = 'none';
    tabs.searchTab.style.display = 'none';
    tabs.timerTab.style.display = 'none';
});
tabBtn.calculatorTabBtn.addEventListener('click', () => {
    tabs.homeTab.style.display = 'none';
    tabs.calculatorTab.style.display = 'block';
    tabs.canvasTab.style.display = 'none';
    tabs.searchTab.style.display = 'none';
    tabs.timerTab.style.display = 'none';
});
tabBtn.canvasTabBtn.addEventListener('click', () => {
    tabs.homeTab.style.display = 'none';
    tabs.calculatorTab.style.display = 'none';
    tabs.canvasTab.style.display = 'block';
    tabs.searchTab.style.display = 'none';
    tabs.timerTab.style.display = 'none';
});
tabBtn.searchTabBtn.addEventListener('click', () => {
    tabs.homeTab.style.display = 'none';
    tabs.calculatorTab.style.display = 'none';
    tabs.canvasTab.style.display = 'none';
    tabs.searchTab.style.display = 'block';
    tabs.timerTab.style.display = 'none';
});
tabBtn.timerTabBtn.addEventListener('click', () => {
    tabs.homeTab.style.display = 'none';
    tabs.calculatorTab.style.display = 'none';
    tabs.canvasTab.style.display = 'none';
    tabs.searchTab.style.display = 'none';
    tabs.timerTab.style.display = 'block';
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
