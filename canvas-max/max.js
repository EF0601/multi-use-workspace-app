
const canvas = document.getElementById("drawingCanvas");
const context = canvas.getContext("2d");

let isDrawing = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;

    context.lineCap = "round";

    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
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
}

function changeWidth() {
    console.log(document.getElementById("sizePicker").value);
    context.strokeStyle = document.getElementById("sizePicker").value;
}
