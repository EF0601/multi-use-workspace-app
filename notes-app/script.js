let noteNumber = 0;

const colors = {
    0: "#d3d3d3",
    1: "#ff0000",
    2: "#ffa500",
    3: "#00ff00",
    4: "#008000",
    5: "#0000ff",
    6: "#800080",
    7: "#000000",
};

function addNote(){
    noteNumber++;
    let newNote = document.getElementById("defaultNote").cloneNode(true);

    newNote.setAttribute("id", "note" + noteNumber);
    newNote.querySelector("#defaultNoteInput").value = document.getElementById("newNoteInput").value;
    newNote.querySelector("#defaultNoteInput").setAttribute("id", "note" + noteNumber + "Input");

    newNote.querySelector("#defaultNoteText").value = document.getElementById("newNoteText").value;
    newNote.querySelector("#defaultNoteText").setAttribute("id", "note" + noteNumber + "Text");

    newNote.querySelector("#defaultNoteColor").setAttribute("onchange", "changeColor(" + noteNumber + ")");
    newNote.querySelector("#defaultNoteColor").value = document.getElementById("newNoteColor").value;
    newNote.querySelector("#defaultNoteColor").setAttribute("id", "note" + noteNumber + "Color");

    let color = document.getElementById("newNoteColor").value;
    if (colors[color]) {
        newNote.querySelector("#defaultNoteHeader").style.backgroundColor = colors[color];
    } else {
        console.error(`Color ${color} not found in colors object.`);
    }

    newNote.querySelector("#defaultNoteHeader").setAttribute("id", "note" + noteNumber + "Header");

    newNote.querySelector(".noteButton").setAttribute("onclick", "deleteNote(" + noteNumber + ")");

    newNote.style.display = "block";
    document.getElementById("notesArea").appendChild(newNote);

    clearNote();
}

function deleteNote(number) {
    document.getElementById("note" + number).remove();
}

function changeColor(number) {
    let color = document.getElementById("note" + number + "Color").value;
    if (colors[color]) {
        document.getElementById("note" + number + "Header").style.backgroundColor = colors[color];
    } else {
        console.error(`Color ${color} not found in colors object.`);
    }
}

function clearNote(){
    document.getElementById("newNoteInput").value = "";
    document.getElementById("newNoteText").value = "";
    document.getElementById("newNoteColor").value = "0";
    document.getElementById("newNoteHeader").style.backgroundColor = colors[0];
}


// make the notesArea the same height as sidebar
function setSize(){
    document.getElementById("notesArea").style.height = document.getElementById("sidebar").offsetHeight + "px";
}
window.addEventListener("resize", setSize);
setSize();
