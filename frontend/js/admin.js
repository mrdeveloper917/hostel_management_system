document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");

  // ✅ Multiple admin credentials stored in an array
  const admins = [
    { username: "ayushkr24", password: "ayush123" },
    { username: "rohan72", password: "rohan456" }
    // { username: "warden", password: "warden789" }
  ];

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // ✅ Check if input matches any admin credentials
    const validAdmin = admins.find(admin => 
      admin.username === username && admin.password === password
    );

    if (validAdmin) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminUser", username);
      window.location.href = "Admin.html";
    } else {
      errorMsg.textContent = "Invalid username or password.";
    }
  });
});
