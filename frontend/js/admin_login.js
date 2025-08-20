// Multiple admin credentials
const ADMIN_CREDENTIALS = [
  { username: "admin1", password: "admin123" },
  { username: "admin2", password: "admin456" }
];

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // stop page refresh

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("errorMsg");

  // Check if any admin matches
  const validAdmin = ADMIN_CREDENTIALS.find(
    admin => admin.username === username && admin.password === password
  );

  if (validAdmin) {
    message.style.color = "green";
    message.textContent = `✅ Login Successful! Welcome ${validAdmin.username}`;
    // redirect to dashboard
    setTimeout(() => {
      window.location.href = "../admin pages/admin_profile.html"; 
    }, 1000);
  } else {
    message.style.color = "red";
    message.textContent = "❌ Invalid Username or Password!";
  }
});