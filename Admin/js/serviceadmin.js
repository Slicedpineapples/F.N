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

