function go() {
    var url = document.getElementById("searchInput").value;
    window.open(url, "_blank");
}
function search() {
    var input = document.getElementById("GoogleSearchInput").value;
    var array = input.split(" ");
    var finalInput = array.join("+");
    window.open("https://www.google.com/search?q=" + finalInput, "_blank");
}

document.getElementById("searchInput").addEventListener("click", () =>{document.getElementById("searchInput").value = "";});
document.getElementById("GoogleSearchInput").addEventListener("click", () => { document.getElementById("GoogleSearchInput").value = ""; });
