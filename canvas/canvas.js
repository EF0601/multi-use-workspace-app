const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let isDrawing = false;
let drawingColor = 'black'; // Default color
let drawingWidth = 1; // Default stroke width

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Add touch event listeners for mobile devices
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(event) {
    event.preventDefault(); // Prevent scrolling on touch devices
    isDrawing = true;
    const clientX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
    context.beginPath();
    context.moveTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
}

function draw(event) {
    if (!isDrawing) return;
    context.strokeStyle = drawingColor;
    context.lineWidth = drawingWidth;
    const clientX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;
    context.lineTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
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
