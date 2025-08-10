document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
    };

    const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    const text = await res.text();
    alert(text);
    if (res.status === 201) {
        window.location.href = 'login.html';
    }
});
