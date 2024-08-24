document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        document.getElementById('signupMessage').innerText = 'This page is restricted.\nRedirecting to login page...';
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.href = 'login.html'; 
    });
});
