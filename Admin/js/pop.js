function showSection(sectionId) {
    const sections = ['services', 'portfolio', 'about', 'profile'];
    
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (id === sectionId) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

function showServiceForm(formType) {
    const forms = ['add-service-form', 'update-service-form', 'delete-service-form', 'all-services-list', 'all-profile-items'];

    forms.forEach(id => {
        const element = document.getElementById(id);
        if (id === `${formType}-service-form` || id === 'all-services-list') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });

    if (formType === 'all') {
        // Fetch and display all services
        fetch('/api/all-services')
            .then(response => response.text())
            .then(html => {
                document.getElementById('all-services-list').innerHTML = html;
            });
    }
}
