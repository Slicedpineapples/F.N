document.addEventListener("DOMContentLoaded", function() {
    fetch('https://localhost:5001/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operation: 'OUTPUT' })
    })
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            // Pick a random index
            const randomIndex = Math.floor(Math.random() * data.length);

            // Get the random profile
            const randomProfile = data[randomIndex];

            // Assign to variables
            const profile_Intro1 = randomProfile.profile_Intro1 || 'N/A';
            const profile_Intro2 = randomProfile.profile_Intro2 || 'N/A';
            const profile_Continua = randomProfile.profile_Continua || 'N/A';

            // Map the values to the HTML elements
            document.getElementById('profile_Intro1').textContent = profile_Intro1;
            document.getElementById('profile_Intro2').textContent = profile_Intro2;
            document.getElementById('profile_Continua').textContent = profile_Continua;

        } else {
            console.error('No profile data found');
        }
    })
    .catch(error => {
        console.error('Error fetching profile data:', error);
    });
});