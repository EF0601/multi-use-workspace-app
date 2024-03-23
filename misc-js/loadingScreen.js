// Get the modal
const modal = document.getElementById("loadingScreen");

modal.style.display = "block";

setTimeout(() => {
    document.getElementById("loadingScreenStatus").innerHTML = "Loaded! Welcome!";
    document.getElementById("loadingScreenBTN").style.display = "inline";
}, 6000);

document.getElementById("loadingScreenBTN").addEventListener("click", () => {
    modal.style.display = "none";
    console.clear();
});

