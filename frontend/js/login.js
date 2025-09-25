// login.js (frontend)
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  try {
    // ✅ Input values ko properly lo
    const email = document.getElementById("email").value.trim();
    // console.log(email);
    
    const password = document.getElementById("password").value.trim();

    const res = await fetch("http://localhost:5000/api/auth/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }) // ✅ clean way
    });

    const data = await res.json();
    console.log("Login Response:", data);

    if (res.ok) {
      localStorage.setItem("studentToken", data.token); // save JWT
      alert("Login successful!");
      window.location.href = "student-dashboard.html";
    } else {
      alert(data.message || "Invalid credentials ❌");
    }
  } catch (err) {
    console.error("Login Error:", err);
    alert("Something went wrong! ❌");
  }
});
