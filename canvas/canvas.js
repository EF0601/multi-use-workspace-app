const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let isDrawing = false;
let drawingColor = 'black'; // Default color
let drawingWidth = 1; // Default stroke width

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

function color(inputColor) {
    switch (inputColor) {
        case 'red':
            drawingColor = 'red';
            break;
        case 'blue':
            drawingColor = 'blue';
            break;
        case 'green':
            drawingColor = 'green';
            break;
        case 'black':
            drawingColor = 'black';
            break;
        case 'white':
            drawingColor = 'white';
            break;
        default:
            break;
    }
}

function larger() {
    drawingWidth = 10;
}
function smaller() {
    drawingWidth = 1;
}
