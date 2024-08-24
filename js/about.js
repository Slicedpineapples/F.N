document.addEventListener("DOMContentLoaded", function() {
    const api = 'https://f-n-2.onrender.com'
    fetch(`${api}/about`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operation: 'OUTPUT' })
    })
    .then(response => response.json())
    .then(data => {
        let timeline = document.querySelector(".timeline");
        if (timeline) {
            data.forEach(item => {
                let timelineItemHTML = `
                    <li>
                        <div class="timeline-image"><img class="rounded-circle img-fluid" src="${item.About_Image}" alt="${item.About_Title}" /></div>
                        <div class="timeline-panel">
                            <div class="timeline-heading">
                                <h6>${item.About_Year}</h6>
                                <h4 class="subheading">${item.About_Title}</h4>
                            </div>
                            <div class="timeline-body"><p class="text-muted">${item.About_Description}</p></div>
                        </div>
                    </li>
                `;
                timeline.innerHTML += timelineItemHTML;
            });
        }
    })
    .catch(error => console.error('Error fetching about data:', error));
});
