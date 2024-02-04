const objects = {
    mainPart: document.getElementById("drawingCanvas"),
    bannerPart: document.getElementById("toolTip"),
};
function changeSize() {
    objects.mainPart.height = 0.85 * window.innerHeight;
    objects.mainPart.width = 0.95 * window.innerWidth;
    objects.bannerPart.style.width = objects.mainPart.width + "px";
}
window.onload = changeSize();
window.addEventListener('resize', changeSize);
