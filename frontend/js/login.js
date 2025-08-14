document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = this.email.value;
    const password = this.password.value;

    try {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const text = await res.text();
        alert(text);

        if (res.status === 200) {
            window.location.href = "Student_dashboard.html";
        }
    } catch (error) {
        alert("⚠️ Error connecting to server");
    }
});
