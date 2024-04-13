/*This js file includes two parts:
1: Customization inputs (Name, theme, etc)
2: Splash text(Weather, currently using, important info, quotes, etc)
3: Interface customization (Theme, font, etc)
*/

// Customization inputs

let customizations = {
    name: "Guest",
    theme: "original",
};

document.getElementById("loadingScreenBTN").addEventListener("click", () => {
    customizations.name = document.getElementById("nameInput").value;
    document.getElementById("titleName").textContent = customizations.name;
});

// Splash text

let quotes = [];
// Get quotes
async function getQuotes() {
    const response = await
    fetch("https://api.quotable.io/random?limit=20");
    const data = await response.json();
    quotes.push(`${data.content} - ${data.author}`);
}

for (let i = 0; i < 20; i++) {
    getQuotes();
}


