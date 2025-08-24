document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const res = await fetch("https://hostel-backend-fkio.onrender.com/signup", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  alert(data.message || data.error);

  if (res.ok) window.location.href = "../pages/login_page.html";
});
