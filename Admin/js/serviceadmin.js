// Check if session ID is set
if (!sessionStorage.getItem('username')) {
    // Redirect to login page or display an error message
    window.location.href = '/';
}

function plusIncome() {
    let incomeExtension = document.getElementById('income-extension');
    let incomeForm = document.getElementById('Add-Income');

    if (incomeExtension.style.display === "none" || !incomeForm) {
        if (!incomeForm) {
            fetch('addincome.html')
                .then(response => response.text())
                .then(html => {
                    const domParser = new DOMParser();
                    const parsedDoc = domParser.parseFromString(html, 'text/html');
                    for (let child of parsedDoc.body.children) {
                        document.adoptNode(child);
                        incomeExtension.appendChild(child);
                    }
                    const userID = sessionStorage.getItem('sessionId');
                    document.getElementById('incomeForm').addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const sourceName = document.getElementById('sourceName').value.trim();
                        const amount = document.getElementById('amount').value.trim();
                        const incomeCategory = document.getElementById('incomeCategory').value.trim();

                        const response = await fetch(`${apiUrl}apiAddIncome`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                            body: JSON.stringify({ sourceName, amount, incomeCategory, userID })
                        });

                        const result = await response.json();
                        document.getElementById('incomeMessage').innerText = result.message;
                        setTimeout(() => {
                            document.getElementById('incomeMessage').innerText = '';
                        }, 1000);
                        setTimeout(() => {
                            document.getElementById('incomeForm').reset();
                        }, 1000);
                    });
                });
        }
        incomeExtension.style.display = "block";
    } else {
        incomeExtension.style.display = "none";
    }
}