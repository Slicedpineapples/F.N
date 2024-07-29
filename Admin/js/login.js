document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Strip empty spaces from the username and get the password
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Determine the base URL based on the hostname
    const hostname = window.location.hostname;
    let apiUrl;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        apiUrl = 'http://127.0.0.1:5001/login';
    } else {
        // Change this to your server's IP address or hostname
        apiUrl = `http://${hostname}:5001/login`;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operation: 'LOGIN', username, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        // console.log(result[0]);

        // Adjust this check based on your actual response structure
        if (result[1] === 'Login successful!') {
            sessionStorage.setItem('username', result[0].username);

            document.getElementById('loginMessage').innerText = result[1];
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = 'admin.html';
    } else {
            document.getElementById('loginMessage').innerText = result[1] || 'Login failed. Offline mode.';
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = 'login.html';
        }
    } catch (error) {
        document.getElementById('loginMessage').innerText =result[1];
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.location.href = 'login.html';
    }
});
