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
            data.forEach((item) => {
                let portfolioHTML = `
                    <div class="col-lg-4 col-sm-6 mb-4">
                        <!-- Portfolio item ${item.Portfolio_ID} -->
                        <div class="portfolio-item">
                            <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${item.Portfolio_ID}">
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

            // Inject modals after fetching the data and creating portfolio items
            injectModals(data);
        }
    })
    .catch(error => console.error('Error fetching portfolio data:', error));
});

// Function to create modal HTML
function createModalHTML(portfolioItem) {
    return `
        <div class="portfolio-modal modal fade" id="portfolioModal${portfolioItem.Portfolio_ID}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    <!-- Project details-->
                                    <h2 class="text-uppercase">${portfolioItem.Portfolio_Title}</h2>
                                    <!-- <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p> -->
                                    <img class="img-fluid d-block mx-auto" src="${portfolioItem.Portfolio_Image}" alt="..." />
                                    <p>${portfolioItem.Portfolio_Long_Description}</p>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Client:</strong>
                                            <a href="${portfolioItem.Client_URL}" target="_blank">${portfolioItem.Client}</a>
                                        </li>
                                        <li>
                                            <strong>Category:</strong>
                                            ${portfolioItem.Category}
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-xmark me-1"></i>
                                        Close Project
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to inject modals into the DOM
function injectModals(portfolioData) {
    const container = document.getElementById('portfolioModalsContainer');
    if (container) {
        portfolioData.forEach(item => {
            const modalHTML = createModalHTML(item);
            container.insertAdjacentHTML('beforeend', modalHTML);
        });
    }
}

