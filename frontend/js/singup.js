console.log("incoming..");


document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log("singup..");
    

    const formData = {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
    };
    console.log("Oye hello yaha fromdata ke niche");
    

    try {
        console.log("try catch me aa gya hu");
        
        const res = await fetch('https://hostel-backend-fkio.onrender.com/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        console.log("yaha tak theek hai");
        
        const data = await res.text();
        console.log(data);
        

        if (res.status === 201) {
            alert("Signup successful! Redirecting to login page...");
            window.location.href = '../pages/login.html';
        } else {
            alert("Signup failed: " + data);
        }
    } catch (err) {
        console.log(err);
        
        alert("Error: " + err.message);
    }
});
