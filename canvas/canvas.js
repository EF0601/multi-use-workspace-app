const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let isDrawing = false;
let drawingColor = 'black'; // Default color
let drawingWidth = 1; // Default stroke width

const colorButton = document.getElementById('colorButton');
colorButton.addEventListener('click', toggleColor);

const strokeWidthButton = document.getElementById('strokeWidthButton');
strokeWidthButton.addEventListener('click', toggleStrokeWidth);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(event) {
    isDrawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function draw(event) {
    if (!isDrawing) return;
    context.strokeStyle = drawingColor;
    context.lineWidth = drawingWidth;
    context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    context.stroke();
}

function stopDrawing() {
    isDrawing = false;
    context.closePath();
}

function toggleColor() {
    if (drawingColor === 'black') {
        drawingColor = 'white';
        colorButton.textContent = 'Change to Black';
    } else {
        drawingColor = 'black';
        colorButton.textContent = 'Change to White';
    }
}

function toggleStrokeWidth() {
    if (drawingWidth === 1) {
        drawingWidth = 10;
        strokeWidthButton.textContent = 'Change to 1px';
    } else {
        drawingWidth = 1;
        strokeWidthButton.textContent = 'Change to 10px';
    }
}
