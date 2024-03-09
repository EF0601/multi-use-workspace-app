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

function clearColorBorders() {
    document.getElementById("black").style.border = "none";
    document.getElementById("red").style.border = "none";
    document.getElementById("blue").style.border = "none";
    document.getElementById("green").style.border = "none";
    document.getElementById("yellow").style.border = "none";
    document.getElementById("purple").style.border = "none";
    document.getElementById("R").style.border = "none";
    document.getElementById("colorPickerInput").style.border = "none";
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
    clearColorBorders();
    switch (buttonClicked) {
        case 1:
            document.getElementById("black").style.border = "2px solid gray";

            break;
        case 2:
            document.getElementById("green").style.border = "2px solid black";
            break;
        case 3:
            document.getElementById("blue").style.border = "2px solid black";
            break;
        case 4:
            document.getElementById("red").style.border = "2px solid black";
            break;
        case 5:
            document.getElementById("yellow").style.border = "2px solid black";
            break;

        case 6:
            document.getElementById("purple").style.border = "2px solid black";
            break;

        case 7:
            document.getElementById("R").style.border = "2px solid black";
            break;

        default:
            break;
    }
    updateCanvas();
}

function submitCustomColor() {
    clearColorBorders();
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
        context.font = textData.size + "px " + textData.font;
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

function clearToolBorders() {
    document.getElementById("noTool").style.border = "none";
    document.getElementById("rectangle").style.border = "none";
    document.getElementById("circle").style.border = "none";
    document.getElementById("text").style.border = "none";
    document.getElementById("line").style.border = "none";
}

function toolSelect(tool) {
    clearToolBorders();
    switch (tool) {
        case "none":
            document.getElementById("noTool").style.border = "2px solid black";
            currentTool = "none";
            break;
        case "rect":
            document.getElementById("rectangle").style.border = "2px solid black";
            currentTool = "rectangle";
            break;
        case "circ":
            document.getElementById("circle").style.border = "2px solid black";
            currentTool = "circle";
            break;
        case "line":
            document.getElementById("line").style.border = "2px solid black";
            currentTool = "line";
            break;
        case "text":
            document.getElementById("text").style.border = "2px solid black";
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
        case "line":
            if (lineDataPoints.firstCoordChosen == false) {
                lineDataPoints.x1 = x;
                lineDataPoints.y1 = y;
                lineDataPoints.firstCoordChosen = true;
            }
            else if (lineDataPoints.secondCoordChosen == false) {
                lineDataPoints.x2 = x;
                lineDataPoints.y2 = y;
                lineDataPoints.secondCoordChosen = true;
                drawLine(lineDataPoints.x1, lineDataPoints.y1, lineDataPoints.x2, lineDataPoints.y2);
                lineDataPoints.firstCoordChosen = false;
                lineDataPoints.secondCoordChosen = false;
                lineDataPoints.x1 = 0;
                lineDataPoints.y1 = 0;
                lineDataPoints.x2 = 0;
                lineDataPoints.y2 = 0;
            }
            else { }
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
        context.fillText(text, x, y);
    }
}

//text change
let textData = {
    font: "Georgia",
    size: 32,

    fontDropdown: document.getElementById("fontDropdown"),
    sizeDropdown: document.getElementById("sizeDropdown"),
};

function changeFont() {
    textData.font = textData.fontDropdown.value;
    context.font = textData.size + "px " + textData.font;
    document.getElementById("textToolInput").style.fontFamily = textData.font;
    console.log(context.font);
}

function changeFontSize() {
    textData.size = textData.sizeDropdown.value;
    context.font = textData.size + "px " + textData.font;
    console.log(context.font);
}

//line
let lineDataPoints = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    firstCoordChosen: false,
    secondCoordChosen: false,
};

function drawLine(x1, y1, x2, y2) {
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

//rectangle
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

//settings
function changeSetting(settingToBeChanged) {
    switch (settingToBeChanged) {
        case 'interval':
            document.getElementById("sizeRange").step = Number(document.getElementById("sliderIntervalSet").value);
            break;
        case 'x-y':
            if (document.getElementById('x-yYN').value == 'yes') {
                document.getElementById('positionContainer').style.display = 'block';
            }
            else if (document.getElementById('x-yYN').value == 'no') {
                document.getElementById('positionContainer').style.display = 'none';
            }
            break;
        default:
            break;
    }
}

//download
function saveImage(downloadName) {
    const dataURL = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataURL;
    if (downloadName != null) {
        link.download = downloadName;
    }
    else {
        link.download = String(document.getElementById('downloadName').value) + '.jpg';
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//keyboard shortcuts
const colorsList = ['black', 'green', 'blue', 'red', 'yellow', 'white', 'random', 'colorPickerInput'];
document.addEventListener('keydown', function (e) {
    keyPressed = e.key;
    if (!isNaN(Number(keyPressed)) && keyPressed > 0 && keyPressed < 9) {
        color(colorsList[Number(keyPressed) - 1], Number(keyPressed));
        if (keyPressed === 8) {
            submitCustomColor();
        }
    }
    else{
        keyPressed = keyPressed.toLowerCase();
        switch (keyPressed) {
            case 'e':
                color('white', 6);
                break;
            case 'f':
                toolSelect('none');
                break;
            case 'r':
                toolSelect('rect');
                break;
            case 'l':
                toolSelect('line');
                break;
            case 't':
                toolSelect('text');
                break;
            case 's':
                document.getElementById("SettingsBTN").click();
                break;
            case 'h':
                document.getElementById("HelpBTN").click();
                break;
            case 'c':
                clearCanvas();
                break;
            case 'd':
                saveImage(prompt('Enter a name for the file'));
                break;
            default:
                break;
        }
    }
});
