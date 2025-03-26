document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-container");

    // Use your actual API key
    const apiKey = "d166d8b5913640bcbca61abc0e93259d";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d166d8b5913640bcbca61abc0e93259d`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.articles) {
                newsContainer.innerHTML = "";

                data.articles.slice(0, 16).forEach(article => {
                    const newsCard = document.createElement("div");
                    newsCard.classList.add("news-card");

                    // Use a default placeholder if no image is available
                    const imageUrl = article.urlToImage ? article.urlToImage : "assets/placeholder.jpg";

                    newsCard.innerHTML = `
                        <img src="${imageUrl}" alt="News Image">
                        <div class="news-content">
                            <h3>${article.title}</h3>
                            <p>${article.description ? article.description.slice(0, 100) + "..." : "No description available."}</p>
                            <a href="${article.url}" target="_blank" class="read-more">Read More</a>
                        </div>
                    `;
                    newsContainer.appendChild(newsCard);
                });
            } else {
                newsContainer.innerHTML = "<p>No news found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = "<p>Failed to load news. Try again later.</p>";
        });
});
