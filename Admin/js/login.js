document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (sessionStorage.getItem('username')) {
        // Display the custom modal
        const modal = document.getElementById('customModal');
        const closeButton = document.getElementById('modalClose');
        
        modal.style.display = 'block';

        // Automatically redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 2000); // 2000 milliseconds = 2 seconds

        // Close the modal when the user clicks on <span> (x)
        closeButton.onclick = function() {
            modal.style.display = 'none';
            window.location.href = 'admin.html';
        }

        // Close the modal when the user clicks anywhere outside of the modal
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                window.location.href = 'admin.html';
            }
        }
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Strip empty spaces from the username and get the password
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const api = 'https://f-n-2.onrender.com'

    try {
        const response = await fetch(`${api}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operation: 'LOGIN', username, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Adjust this check based on your actual response structure
        if (result[1] === 'Login successful!') {
            sessionStorage.setItem('username', result[0].username);

            document.getElementById('loginMessage').innerText = result[1];
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = 'admin.html'; // Redirect to admin page on successful login
        } else {
            document.getElementById('loginMessage').innerText = result[1] || 'Login failed. Please try again.';
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = 'login.html'; // Redirect back to login page on failure
        }
    } catch (error) {
        document.getElementById('loginMessage').innerText = 'A network error occurred. Please reconnect and try again.';
        await new Promise(resolve => setTimeout(resolve, 3000));
        window.location.href = 'login.html'; // Redirect back to login page on error
    }
});

