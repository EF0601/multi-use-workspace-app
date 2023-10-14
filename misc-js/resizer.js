const objects = {
    mainPart: document.getElementById("bodyObject"),
};
function changeSize() {
    objects.mainPart.style.height = 0.8 * window.innerHeight + "px";
    objects.mainPart.style.width = 0.8 * window.innerWidth + "px";
}
window.onload = changeSize();
window.addEventListener('resize', changeSize);
