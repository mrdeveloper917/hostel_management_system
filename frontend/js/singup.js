const form = document.getElementById('signupForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // FormData object bana lo
    const formData = new FormData(form);

    try {
        const res = await fetch('http://localhost:5000/api/auth/student/register', {
            method: 'POST',
            body: formData  // ✅ files + text dono handle karega
        });

        // Response ko parse karo
        const data = await res.json();

        if (!res.ok) {
            alert(data.message || 'Signup failed');
            return;
        }

        // alert('Signup successful! ✅');

    setInterval(() => {

        window.location.href = "../pages/login.html"
    },2000)


    } catch (err) {
        console.error(err);
        alert('Something went wrong! ❌');
    }
});
