document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Strip empty spaces from the username and get the password
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Determine the base URL based on the hostname
        const hostname = window.location.hostname;
        let apiUrl;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            apiUrl = 'https://127.0.0.1:5001/login';
        } else {
            apiUrl = `https://${hostname}:5001/login`;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ operation: 'SIGNUP', username, password })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);

            if (result === 'User created successfully!\n Proceed to login.') {

                document.getElementById('signupMessage').innerText = result;
                await new Promise(resolve => setTimeout(resolve, 1000));
                window.location.href = 'login.html';
            } else {
                document.getElementById('signupMessage').innerText = result || 'Signup failed. Please try again.';
                await new Promise(resolve => setTimeout(resolve, 1000));
                window.location.href = 'signup.html'; 
            }
        } catch (error) {
            document.getElementById('signupMessage').innerText = 'An error occurred. Please try again.';
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = 'signup.html'; 
        }
    });
});
