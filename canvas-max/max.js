const canvas = document.getElementById("drawingCanvas");
const context = canvas.getContext("2d");

let isDrawing = false;

let x = 0;
let y = 0;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("mousedown", toolUse);

//touchscreen support
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

canvas.addEventListener("touchstart", toolUse);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing || currentTool != "none") {
        //nothing lol
    }
    else {
        context.lineCap = "round";

        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    //update position
    x = e.clientX - canvas.offsetLeft;
    y = e.clientY - canvas.offsetTop;
    document.getElementById("xPos").innerHTML = x;
    document.getElementById("yPos").innerHTML = y;

}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}

//color picker
function color(input, buttonClicked) {
    if (input != "random") {
        context.strokeStyle = input;
    }
    else {
        const possibleValues = ["A", "B", "C", "D", "E", "F", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        let selection = ["#"];
        for (let i = 0; i < 6; i++) {
            selection.push(possibleValues[Math.floor(Math.random() * (16 + 1))]);
        }
        context.strokeStyle = selection.join("");
    }
    switch (buttonClicked) {
        case 1:
            document.getElementById("black").style.border = "2px solid gray";
            document.getElementById("red").style.border = "none";
            document.getElementById("blue").style.border = "none";
            document.getElementById("green").style.border = "none";
            document.getElementById("yellow").style.border = "none";
            document.getElementById("purple").style.border = "none";
            document.getElementById("R").style.border = "none";
            document.getElementById("colorPickerInput").style.border = "none";
            break;
        case 2:
            document.getElementById("black").style.border = "none";
            document.getElementById("red").style.border = "2px solid black";
            document.getElementById("blue").style.border = "none";
            document.getElementById("green").style.border = "none";
            document.getElementById("yellow").style.border = "none";
            document.getElementById("purple").style.border = "none";
            document.getElementById("R").style.border = "none";
            document.getElementById("colorPickerInput").style.border = "none";
            break;
        case 3:
            document.getElementById("black").style.border = "none";
            document.getElementById("red").style.border = "none";
            document.getElementById("blue").style.border = "2px solid black";
            document.getElementById("green").style.border = "none";
            document.getElementById("yellow").style.border = "none";
            document.getElementById("purple").style.border = "none";
            document.getElementById("R").style.border = "none";
            document.getElementById("colorPickerInput").style.border = "none";
            break;
        case 4:
            document.getElementById("black").style.border = "none";
            document.getElementById("red").style.border = "none";
            document.getElementById("blue").style.border = "none";
            document.getElementById("green").style.border = "2px solid black";
            document.getElementById("yellow").style.border = "none";
            document.getElementById("purple").style.border = "none";
            document.getElementById("R").style.border = "none";
            document.getElementById("colorPickerInput").style.border = "none";
            break;
        case 5:
            document.getElementById("black").style.border = "none";
            document.getElementById("red").style.border = "none";
            document.getElementById("blue").style.border = "none";
            document.getElementById("green").style.border = "none";
            document.getElementById("yellow").style.border = "2px solid black";
            document.getElementById("purple").style.border = "none";
            document.getElementById("R").style.border = "none";
            document.getElementById("colorPickerInput").style.border = "none";
            break;

        case 6:
            document.getElementById("black").style.border = "none";
            document.getElementById("red").style.border = "none";
            document.getElementById("blue").style.border = "none";
            document.getElementById("green").style.border = "none";
            document.getElementById("yellow").style.border = "none";
            document.getElementById("purple").style.border = "2px solid black";
            document.getElementById("R").style.border = "none";
            document.getElementById("colorPickerInput").style.border = "none";
            break;

        case 7:
            document.getElementById("black").style.border = "none";
            document.getElementById("red").style.border = "none";
            document.getElementById("blue").style.border = "none";
            document.getElementById("green").style.border = "none";
            document.getElementById("yellow").style.border = "none";
            document.getElementById("purple").style.border = "none";
            document.getElementById("R").style.border = "2px solid black";
            document.getElementById("colorPickerInput").style.border = "none";
            break;

        default:
            break;
    }
    updateCanvas();
}

function submitCustomColor() {
    document.getElementById("black").style.border = "none";
    document.getElementById("red").style.border = "none";
    document.getElementById("blue").style.border = "none";
    document.getElementById("green").style.border = "none";
    document.getElementById("yellow").style.border = "none";
    document.getElementById("purple").style.border = "none";
    document.getElementById("R").style.border = "none";
    document.getElementById("colorPickerInput").style.border = "2px solid black";
    context.strokeStyle = document.getElementById("colorPickerInput").value;
    updateCanvas();
}

//size picker
const sizer = {
    slider: document.getElementById("sizeRange"),

    canvas: document.getElementById("sizeCanvas"),
    ctx: document.getElementById("sizeCanvas").getContext("2d"),

    span: document.getElementById("sizeSpan"),
};

function updateCanvas() {
    sizer.ctx.lineWidth = sizer.slider.value;
    sizer.ctx.strokeStyle = context.strokeStyle;
    sizer.ctx.clearRect(0, 0, 100, 100);
    sizer.ctx.moveTo(0, 50);
    sizer.ctx.lineTo(50, 50);
    sizer.ctx.stroke();
    context.lineWidth = sizer.slider.value;
    sizer.span.innerHTML = sizer.slider.value;
}

sizer.slider.oninput = function () {
    updateCanvas();
};

//onload
window.onload = updateCanvas();
window.onload = function () {
    setTimeout(() => {
        location.reload();
    }, 5);
};

//updates the max of slider
function updateSliderMax() {
    const thing = document.getElementById('sliderMax');
    if (typeof (Number(thing.value)) === "number" && thing.value > 0 && thing.value < 1000) {
        sizer.slider.max = thing.value;
    }
    else {
        sizer.slider.max = 100;
        thing.value = 0;
    }
}

//deletes value on click
document.getElementById('sliderMax').addEventListener('click', function () {
    document.getElementById('sliderMax').value = '';
});

//clear canvas
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//tools
let currentTool = "none";
//tool select
function toolSelect(tool) {
    switch (tool) {
        case "none":
            document.getElementById("noTool").style.border = "2px solid black";
            document.getElementById("rectangle").style.border = "none";
            document.getElementById("circle").style.border = "none";
            document.getElementById("text").style.border = "none";
            document.getElementById("line").style.border = "none";
            currentTool = "none";
            break;
        case "rect":
            document.getElementById("noTool").style.border = "none";
            document.getElementById("rectangle").style.border = "2px solid black";
            document.getElementById("circle").style.border = "none";
            document.getElementById("text").style.border = "none";
            document.getElementById("line").style.border = "none";
            currentTool = "rectangle";
            break;
        case "circ":
            document.getElementById("noTool").style.border = "none";
            document.getElementById("rectangle").style.border = "none";
            document.getElementById("circle").style.border = "2px solid black";
            document.getElementById("text").style.border = "none";
            document.getElementById("line").style.border = "none";
            currentTool = "circle";
            break;
        case "line":
            document.getElementById("noTool").style.border = "none";
            document.getElementById("rectangle").style.border = "none";
            document.getElementById("circle").style.border = "none";
            document.getElementById("text").style.border = "none";
            document.getElementById("line").style.border = "2px solid black";
            currentTool = "line";
            break;
        case "text":
            document.getElementById("noTool").style.border = "none";
            document.getElementById("rectangle").style.border = "none";
            document.getElementById("circle").style.border = "none";
            document.getElementById("text").style.border = "2px solid black";
            document.getElementById("line").style.border = "none";
            currentTool = "text";
            break;
    }
}

function toolUse() {
    switch (currentTool) {
        case "rectangle":
            if (rectangleDataPoints.firstCoordChosen == false) {
                rectangleDataPoints.x1 = x;
                rectangleDataPoints.y1 = y;
                rectangleDataPoints.firstCoordChosen = true;
            }
            else if (rectangleDataPoints.secondCoordChosen == false) {
                rectangleDataPoints.x2 = x;
                rectangleDataPoints.y2 = y;
                rectangleDataPoints.secondCoordChosen = true;
                drawRectangle(rectangleDataPoints.x1, rectangleDataPoints.y1, rectangleDataPoints.x2, rectangleDataPoints.y2);
                rectangleDataPoints.firstCoordChosen = false;
                rectangleDataPoints.secondCoordChosen = false;
                rectangleDataPoints.x1 = 0;
                rectangleDataPoints.y1 = 0;
                rectangleDataPoints.x2 = 0;
                rectangleDataPoints.y2 = 0;
            }
            else { }
            break;
        case "circle":
            // drawCircle();
            break;
        case "text":
            drawText();
            break;
    }
}

//text
function drawText() {
    let text = document.getElementById("textToolInput").value;
    if (text != null) {
        context.font = "30px Georgia";
        context.fillText(text, x, y);
    }
}

let rectangleDataPoints = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    firstCoordChosen: false,
    secondCoordChosen: false,
};
function drawRectangle(x1, y1, x2, y2) {
    context.lineCap = "square";
    context.moveTo(x1, y1);
    context.lineTo(x2, y1);
    context.lineTo(x2, y2);
    context.lineTo(x1, y2);
    context.lineTo(x1, y1);
    context.stroke();
    context.lineCap = "round";
}
