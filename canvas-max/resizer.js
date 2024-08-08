const objects = {
    mainPart: document.getElementById("drawingCanvas"),
    bannerPart: document.getElementById("toolTip"),
};

/*
Thanks to https://stackoverflow.com/questions/5517783/preventing-canvas-clear-when-resizing-window
//create a temporary canvas obj to cache the pixel data //
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
//set it to the new width & height and draw the current canvas data into it //
canvas.width = w;
canvas.height = h;
context.fillStyle = _background;  // the original canvas's background color
context.fillRect(0, 0, w, h);
context.drawImage(_canvas, 0, 0);
//resize & clear the original canvas and copy back in the cached pixel data //
_canvas.width = w;
_canvas.height = h;
_context.drawImage(canvas, 0, 0);
*/

function changeSize() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 0.95 * window.innerWidth;
    canvas.height = 0.70 * window.innerHeight;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(objects.mainPart, 0, 0);

    objects.mainPart.height = 0.70 * window.innerHeight;
    objects.mainPart.width = 0.95 * window.innerWidth;
    objects.mainPart.getContext("2d").drawImage(canvas, 0, 0);
    objects.bannerPart.style.width = objects.mainPart.width + "px";
    // objects.bannerPart.style.height = window.innerHeight * 0.2 + "px";
}
window.onload = changeSize();
window.addEventListener('resize', changeSize);
