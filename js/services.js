document.addEventListener("DOMContentLoaded", function() {
    const api = 'https://f-n-2.onrender.com'
    fetch(`${api}/service`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operation: 'OUTPUT' })
    })
    .then(response => response.json())
    .then(data => {
        let servicesRow = document.querySelector("#services .row.text-center");
        if (servicesRow) {
            data.forEach(service => {
                let serviceHTML = `
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <i class="fas fa-circle fa-stack-2x text-primary"></i>
                            <i class="fas ${service.service_Image} fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 class="my-3">${service.service_Title}</h4>
                        <p class="text-muted">${service.service_Description}</p>
                    </div>
                `;
                servicesRow.innerHTML += serviceHTML;
            });
        }
    })
    .catch(error => console.error('Error fetching data:', error));
});
