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
let possibleTexts = ["Proudly created and maintained by EF0601 studios. You are using: v1.5.0 release.", "This app is still in development. Our Github page welcomes you.", "Our GitHub page is https://github.com/EF0601/multi-use-workspace-app", "Beep boop beep boop hello there!", "This is your daily reminder to drink water.", "Where is the closest restaurant? Use our Web Explorer to find that out for you!", "Our calculator app will be deprecated starting 4/22/2024. More on our GitHub.", "The next feature is going to be the theme customization feature. Join the Hype train!", "CORS is a pain. We know. We are working on it.", "The weather app is currently using the National Weather Service API. More on our GitHub.", "The loading screen is currently using the Quotable API.", "The theme is currently using the original theme.", "Did you do your Duolingo lesson today?", "Don't look at your phone... use the Weather API!", "The weather app is limited to the USA :(", "I typed this whole list of messages. Send help."];

// Splash text
function changeSplashText(){
    if (Math.random() < 0.5) {
        document.getElementById("splashText").textContent = possibleTexts[Math.floor(Math.random() * possibleTexts.length)];
    }
    else {
        document.getElementById("splashText").textContent = quotes[0];
        quotes.shift();
        getQuotes();
    }
}

setInterval(() => {
    changeSplashText();
}, 5000);

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
