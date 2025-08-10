document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        email: this.email.value,
        password: this.password.value
    };

    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    const text = await res.text();
    alert(text);
    if (res.status === 200) {
        window.location.href = 'Student_dashboard.html';
    }
});
