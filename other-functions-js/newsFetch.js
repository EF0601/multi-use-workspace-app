let news = {
    news1: {
        title: "",
        description: "",
        url: "",
    },
    news2: {
        title: "",
        description: "",
        url: "",
    },
};

function fetchNewsData() {
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/general/us.json")
        .then(response => response.json())
        .then(data => {
            news.news1.title = data.articles[0].title;
            news.news1.description = data.articles[0].description;
            news.news1.url = data.articles[0].url;
            news.news2.title = data.articles[1].title;
            news.news2.description = data.articles[1].description;
            news.news2.url = data.articles[1].url;
            outputNewsData();
        });
}
function outputNewsData() {
    document.getElementById('newsTitle1').textContent = news.news1.title;
    document.getElementById('newsDesc1').textContent = news.news1.description;
    document.getElementById('newsLink1').href = news.news1.url;
    document.getElementById('newsTitle2').textContent = news.news2.title;
    document.getElementById('newsDesc2').textContent = news.news2.description;
    document.getElementById('newsLink2').href = news.news2.url;
}
fetchNewsData();
