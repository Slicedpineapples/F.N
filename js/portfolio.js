document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:5001/portfolio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operation: 'OUTPUT' })
    })
    .then(response => response.json())
    .then(data => {
        let portfolioRow = document.querySelector("#portfolio .row");
        if (portfolioRow) {
            data.forEach((item, index) => {
                let portfolioHTML = `
                    <div class="col-lg-4 col-sm-6 mb-4">
                        <!-- Portfolio item ${index + 1} -->
                        <div class="portfolio-item">
                            <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${index + 1}">
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                </div>
                                <img class="img-fluid" src="${item.Portfolio_Image}" alt="${item.Portfolio_Title}" />
                            </a>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">${item.Portfolio_Title}</div>
                                <div class="portfolio-caption-subheading text-muted">${item.Category}</div>
                            </div>
                        </div>
                    </div>
                `;
                portfolioRow.innerHTML += portfolioHTML;
            });
        }
    })
    .catch(error => console.error('Error fetching portfolio data:', error));
});

