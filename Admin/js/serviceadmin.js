// Check if session ID is set
if (!sessionStorage.getItem('username')) {
    // Redirect to login page or display an error message
    window.location.href = '/';
}

// Sorting hostname for API URL
const hostname = window.location.hostname;
let apiUrl;
if (hostname === 'localhost' || hostname === '127.0.0.1') {
    apiUrl = 'http://127.0.0.1:5001/';
} else {
    apiUrl = `http://${hostname}:5001/`;
}

function endSession(){
    sessionStorage.clear();
    window.location.href = 'login.html';
}

function serviceINPUT() {
    let serviceExtension = document.getElementById('service-extension');
    let serviceForm = document.getElementById('serviceINPUT');

    // Check if serviceExtension exists
    if (!serviceExtension) {
        console.error('Element with ID "service-extension" not found.');
        return;
    }

    if (serviceExtension.style.display === "none" || !serviceForm) {
        if (!serviceForm) {
            fetch('templates/service.html')
                .then(response => response.text())
                .then(html => {
                    const domParser = new DOMParser();
                    const parsedDoc = domParser.parseFromString(html, 'text/html');

                    // Append all child nodes from parsedDoc to serviceExtension
                    while (parsedDoc.body.firstChild) {
                        serviceExtension.appendChild(document.adoptNode(parsedDoc.body.firstChild));
                    }

                    // Ensure DOM is updated before adding event listener
                    serviceForm = document.getElementById('serviceINPUT');
                    if (serviceForm) {
                        serviceForm.addEventListener('submit', async (e) => {
                            e.preventDefault();
                            const Image = document.getElementById('image').value.trim();
                            const Title = document.getElementById('title').value.trim();
                            const Description = document.getElementById('description').value.trim();

                            // Validate form data
                            if (!Image || !Title || !Description) {
                                document.getElementById('serviceMessage').innerText = 'Please fill in all the fields.';
                                setTimeout(() => {
                                    document.getElementById('serviceMessage').innerText = '';
                                }, 3000);
    
                                return;
                            }

                            const response = await fetch(`${apiUrl}service`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                                body: JSON.stringify({
                                    'service_Image': Image,
                                    'service_Title': Title,
                                    'service_Description': Description,
                                    'operation': 'INPUT'
                                })
                            });

                            const result = await response.json();
                            document.getElementById('serviceMessage').innerText = result;
                            setTimeout(() => {
                                document.getElementById('serviceMessage').innerText = '';
                            }, 3000);
                            serviceForm.reset();
                        });
                    } else {
                        console.error('Form element not found after fetching template.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching the template:', error);
                });
        }
        serviceExtension.style.display = "block";
    } else {
        serviceExtension.style.display = "none";
    }
}

function portfolioINPUT() {
    let portfolioExtension = document.getElementById('portfolio-extension');
    let portfolioForm = document.getElementById('portfolioINPUT');

    // Check if portfolioExtension exists
    if (!portfolioExtension) {
        console.error('Element with ID "portfolio-extension" not found.');
        return;
    }

    if (portfolioExtension.style.display === "none" || !portfolioForm) {
        if (!portfolioForm) {
            fetch('templates/portfolio.html')
                .then(response => response.text())
                .then(html => {
                    const domParser = new DOMParser();
                    const parsedDoc = domParser.parseFromString(html, 'text/html');
                    while (parsedDoc.body.firstChild) {
                        portfolioExtension.appendChild(document.adoptNode(parsedDoc.body.firstChild));
                    }

                    // Ensure DOM is updated before adding event listener
                    portfolioForm = document.getElementById('portfolioINPUT');
                    if (portfolioForm) {
                        portfolioForm.addEventListener('submit', async (e) => {
                            e.preventDefault();

                            // Collect form data
                            const image = document.getElementById('image').value.trim();
                            const title = document.getElementById('title').value.trim();
                            const description = document.getElementById('description').value.trim();
                            const client = document.getElementById('client').value.trim();
                            const client_URL = document.getElementById('client_URL').value.trim();
                            const category = document.getElementById('category').value.trim();

                            // Validate form data
                            if (!image || !title || !description || !client || !client_URL || !category) {
                                document.getElementById('portfolioMessage').innerText = 'Please fill in all the fields.';
                                setTimeout(() => {
                                    document.getElementById('portfolioMessage').innerText = '';
                                }, 3000);
    
                                return;
                            }

                            // Make the POST request to the API
                            const response = await fetch(`${apiUrl}portfolio`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({
                                    'portfolio_Image': image,
                                    'portfolio_Title': title,
                                    'portfolio_Long_Description': description,
                                    'Client': client,
                                    'Client_URL': client_URL,
                                    'Category': category,
                                    'operation': 'INPUT'
                                })
                            });

                            const result = await response.json();
                            // console.log(result);
                            document.getElementById('portfolioMessage').innerText = result;
                            setTimeout(() => {
                                document.getElementById('portfolioMessage').innerText = '';
                            }, 3000);

                            // Reset the form fields
                            portfolioForm.reset();
                        });
                    } else {
                        console.error('Form element not found after fetching template.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching the template:', error);
                });
        }
        portfolioExtension.style.display = "block";
    } else {
        portfolioExtension.style.display = "none";
    }
}

function aboutINPUT() {
    let aboutExtension = document.getElementById('about-extension');
    let aboutForm = document.getElementById('aboutINPUT');

    if (!aboutExtension) {
        console.error('Element with ID "about-extension" not found.');
        return;
    }

    if (aboutExtension.style.display === "none" || !aboutForm) {
        if (!aboutForm) {
            fetch('templates/about.html')
                .then(response => response.text())
                .then(html => {
                    const domParser = new DOMParser();
                    const parsedDoc = domParser.parseFromString(html, 'text/html');
                    while (parsedDoc.body.firstChild) {
                        aboutExtension.appendChild(document.adoptNode(parsedDoc.body.firstChild));
                    }

                    aboutForm = document.getElementById('aboutINPUT');
                    if (aboutForm) {
                        aboutForm.addEventListener('submit', async (e) => {
                            e.preventDefault();

                            // Retrieve form data
                            const year = document.getElementById('year').value.trim();
                            const title = document.getElementById('title').value.trim();
                            const description = document.getElementById('description').value.trim();
                            const image = document.getElementById('image').value.trim();

                            // Validate form data
                            if (!image || !year || !title || !description) {
                                document.getElementById('aboutMessage').innerText = 'Please fill in all the fields.';
                                setTimeout(() => {
                                    document.getElementById('aboutMessage').innerText = '';
                                }, 3000);
    
                                return;
                            }

                            try {
                                const response = await fetch(`${apiUrl}about`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        'about_Year': year,
                                        'about_Title': title,
                                        'about_Description': description,
                                        'about_Image': image,
                                        'operation': 'INPUT'
                                    })
                                });

                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }

                                const result = await response.json();
                                document.getElementById('aboutMessage').innerText = result;
                                setTimeout(() => {
                                    document.getElementById('aboutMessage').innerText = '';
                                }, 3000);
                                aboutForm.reset();
                            } catch (error) {
                                console.error('Error submitting about item:', error);
                                document.getElementById('aboutMessage').innerText = 'Error submitting about item.';
                            }
                        });
                    } else {
                        console.error('Form element not found after fetching template.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching the template:', error);
                });
        }
        aboutExtension.style.display = "block";
    } else {
        aboutExtension.style.display = "none";
    }
}

async function allServices() {
    let serviceExtension = document.getElementById('all-services-extension');

    try {
            // Fetch data from the API
            const response = await fetch(`${apiUrl}service`, {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'operation': 'OUTPUT' })
            });

            // Check if the response is OK
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse JSON data
            const apiData = await response.json();
            // console.log(apiData);

            // Clear previous content
            serviceExtension.innerHTML = '';

            // Create table element
            let table = document.createElement('table');
            table.classList.add('table', 'table-striped', 'table-bordered');

            // Create table header
            let thead = document.createElement('thead');
            let headerRow = document.createElement('tr');

            let headers = ['Service ID', 'Service Title', 'Service Description', 'Service Image', 'Actions'];
            headers.forEach(headerText => {
                let th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table body
            let tbody = document.createElement('tbody');

            apiData.forEach(service => {
                let row = document.createElement('tr');

                let cellID = document.createElement('td');
                cellID.textContent = service.service_ID;
                row.appendChild(cellID);

                let cellTitle = document.createElement('td');
                cellTitle.textContent = service.service_Title;
                row.appendChild(cellTitle);

                let cellDescription = document.createElement('td');
                cellDescription.textContent = service.service_Description;
                row.appendChild(cellDescription);

                let cellImage = document.createElement('td');
                let img = document.createElement('img');
                img.src = service.service_Image; 
                img.alt = service.service_Title;
                img.style.width = '50px';  
                cellImage.appendChild(img);
                row.appendChild(cellImage);

                // Create actions cell
                let cellActions = document.createElement('td');

                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
                deleteButton.onclick = () => deleteService(service.service_ID);

                // let updateButton = document.createElement('button');
                // updateButton.textContent = 'Update';
                // updateButton.classList.add('btn', 'btn-warning', 'btn-sm');
                // updateButton.onclick = () => updateService(service);

                cellActions.appendChild(deleteButton);
                // cellActions.appendChild(updateButton);

                row.appendChild(cellActions);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            serviceExtension.appendChild(table);

            serviceExtension.style.display = 'block';

        } catch (error) {
            console.error('Error fetching or displaying data:', error);
        }

    
}

async function deleteService(service_ID) {
    try {
        const response = await fetch(`${apiUrl}service`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                'operation': 'DELETE', 
                'service_ID': service_ID 
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        // console.log('Delete result:', result);
        // Refresh the table
        allServices();

    } catch (error) {
        console.error('Error deleting service:', error);
    }
}

function updateService(service) {
    // console.log('Update service:', service); // To complete
}
async function allPortfolio() {
    let portfolioExtension = document.getElementById('all-portfolio-extension');

    // Check if the element exists
    if (!portfolioExtension) {
        console.error('Element with ID "all-portfolio-extension" not found.');
        return;
    }

    try {
        // Fetch data from the API
        const response = await fetch(`${apiUrl}portfolio`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'operation': 'OUTPUT' })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse JSON data
        const apiData = await response.json();
        // console.log(apiData);

        // Clear previous content
        portfolioExtension.innerHTML = '';

        // Create table element
        let table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-bordered');

        // Create table header
        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');

        let headers = ['Portfolio ID', 'Portfolio Title', 'Portfolio Description', 'Client', 'Client URL', 'Category', 'Portfolio Image', 'Actions'];
        headers.forEach(headerText => {
            let th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        let tbody = document.createElement('tbody');

        apiData.forEach(portfolio => {
            let row = document.createElement('tr');

            let cellID = document.createElement('td');
            cellID.textContent = portfolio.Portfolio_ID || 'N/A'; // Handle missing data
            row.appendChild(cellID);

            let cellTitle = document.createElement('td');
            cellTitle.textContent = portfolio.Portfolio_Title || 'N/A'; // Handle missing data
            row.appendChild(cellTitle);

            let cellDescription = document.createElement('td');
            cellDescription.textContent = portfolio.Portfolio_Long_Description || 'N/A'; // Handle missing data
            row.appendChild(cellDescription);

            let cellClient = document.createElement('td');
            cellClient.textContent = portfolio.Client || 'N/A'; // Handle missing data
            row.appendChild(cellClient);

            let cellClientURL = document.createElement('td');
            cellClientURL.textContent = portfolio.Client_URL || 'N/A'; // Handle missing data
            row.appendChild(cellClientURL);

            let cellCategory = document.createElement('td');
            cellCategory.textContent = portfolio.Category || 'N/A'; // Handle missing data
            row.appendChild(cellCategory);

            // Handle portfolio image
            let cellImage = document.createElement('td');
            let img = document.createElement('img');
            img.src = portfolio.Portfolio_Image || ''; // Handle missing image
            img.alt = portfolio.Portfolio_Title || 'Image';
            img.style.width = '100px'; // Adjust size as needed
            cellImage.appendChild(img);
            row.appendChild(cellImage);

            // Create actions cell
            let cellActions = document.createElement('td');

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.onclick = () => deletePortfolio(portfolio.Portfolio_ID);
            deleteButton.onclick = () => {
                if (confirm('Are you sure you want to delete this portfolio?')) {
                    deletePortfolio(portfolio.Portfolio_ID);
                }
            };
            

            // Optionally add an update button
            // let updateButton = document.createElement('button');
            // updateButton.textContent = 'Update';
            // updateButton.classList.add('btn', 'btn-warning', 'btn-sm');
            // updateButton.onclick = () => updatePortfolio(portfolio);

            cellActions.appendChild(deleteButton);
            // cellActions.appendChild(updateButton);

            row.appendChild(cellActions);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        portfolioExtension.appendChild(table);

        // Optionally, show the portfolioExtension if it was hidden
        portfolioExtension.style.display = 'block';

    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
}
async function deletePortfolio(portfolio_ID) {
    try {
        const response = await fetch(`${apiUrl}portfolio`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                'operation': 'DELETE', 
                'portfolio_ID': portfolio_ID 
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse JSON response
        const result = await response.json();
        // console.log('Delete result:', result);

        // Refresh the portfolio list
        allPortfolio();

    } catch (error) {
        console.error('Error deleting portfolio:', error);
    }
}
// function allAbout