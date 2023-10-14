const objects = {
    mainPart: document.getElementById("canvas"),
    bannerPart: document.getElementById("banner"),
};
function changeSize() {
    objects.mainPart.height = 0.85 * window.innerHeight;
    objects.mainPart.width = 0.95 * window.innerWidth;
    objects.bannerPart.style.width = objects.mainPart.width + "px";
}
window.onload = changeSize();
window.addEventListener('resize', changeSize);
