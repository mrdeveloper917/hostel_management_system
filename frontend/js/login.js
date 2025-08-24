document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const body = JSON.stringify(Object.fromEntries(formData.entries()));

  const res = await fetch("https://hostel-backend-fkio.onrender.com/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "../index.html";
  } else {
    alert(data.error);
  }
});
