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
                    // console.log('Fetched HTML:', html); // Log the fetched HTML content
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
                            // console.log(apiUrl);
                            
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
                            // console.log(result);
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
// Function to show all services
async function showAllServices() {
    const servicesContainer = document.getElementById('all-services-list');

    if (!servicesContainer) {
        console.error('Element with ID "all-services-list" not found.');
        return;
    }

    try {
        // Fetch services from the API using POST method
        const response = await fetch(`${apiUrl}services`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json' 
            },
            body: JSON.stringify({ operation: 'OUTPUT' }) // Send the operation as part of the request body
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const services = await response.json();

        // Clear previous content
        servicesContainer.innerHTML = '';

        // Create and append elements for each service
        services.forEach(service => {
            const serviceDiv = document.createElement('div');
            serviceDiv.classList.add('service-item');
            serviceDiv.setAttribute('data-id', service.About_ID);

            // Create and append service details
            const image = document.createElement('img');
            image.src = `path/to/images/${service.About_Image}`; // Adjust path as needed
            image.alt = service.About_Title;
            image.style.width = '100px'; // Example style, adjust as needed
            image.style.height = 'auto'; // Example style, adjust as needed
            serviceDiv.appendChild(image);

            const title = document.createElement('h3');
            title.innerText = service.About_Title;
            serviceDiv.appendChild(title);

            const description = document.createElement('p');
            description.innerText = service.About_Description;
            serviceDiv.appendChild(description);

            const year = document.createElement('p');
            year.innerText = `Year: ${service.About_Year}`;
            serviceDiv.appendChild(year);

            // Append the service item to the container
            servicesContainer.appendChild(serviceDiv);
        });
    } catch (error) {
        console.error('Error fetching services:', error);
    }
}

// Call the function to display services when the page loads
document.addEventListener('DOMContentLoaded', showAllServices);
