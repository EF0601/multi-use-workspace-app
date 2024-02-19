
const canvas = document.getElementById("drawingCanvas");
const context = canvas.getContext("2d");

let isDrawing = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

//touchscreen support
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) {
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
    document.getElementById("xPos").innerHTML = e.clientX - canvas.offsetLeft;
    document.getElementById("yPos").innerHTML = e.clientY - canvas.offsetTop;

}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}

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
    sizer.ctx.lineTo(100, 50);
    sizer.ctx.stroke();
    context.lineWidth = sizer.slider.value;
    sizer.span.innerHTML = sizer.slider.value;
}

sizer.slider.oninput = function () {
    updateCanvas();
};

//onload
window.onload = updateCanvas();

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
