//    College Name :-
const collegeList = [
  { name: "B.K.N.S.G.P GOPALGANJ", page: "bk_nsgp_gopalganj.html" },
  { name: "ARYABHATT POLYTECHNIC, GAYA", page: "aryabhatt_polytechnic_gaya.html" },
  { name: "BUDHA POLY INSTITUTE, GAYA", page: "budha_poly_institute_gaya.html" },
  { name: "G.P.MOTIHARI", page: "gp_motihari.html" },
  { name: "G.P.BHOJPUR", page: "gp_bhojpur.html" },
  { name: "G.P.MUNGER", page: "gp_munger.html" },
  { name: "G.P.SIWAN", page: "gp_siwan.html" },
  { name: "G.P.GOPALGANJ", page: "gp_gopalganj.html" },
  { name: "G.P.PATNA-7", page: "gp_patna7.html" },
  { name: "G.W.P.MUZAFFARPUR", page: "gwp_muzaffarpur.html" }
];

function filterColleges() {
  const input = document.getElementById("searchBox").value.toLowerCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (input === "") return;

  const filtered = collegeList.filter(college =>
    college.name.toLowerCase().includes(input)
  );

  if (filtered.length === 0) {
    suggestions.innerHTML = "<li>No college found</li>";
    return;
  }

  filtered.forEach(college => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = college.page;
    a.textContent = college.name;
    a.style.textDecoration = "none";
    a.style.color = "inherit";
    a.onclick = () => {
      document.getElementById("searchBox").value = college.name;
      suggestions.innerHTML = "";
    };

    li.appendChild(a);
    suggestions.appendChild(li);
  });
}




 
  
// frontend/js/app.js

// =======================
// Function to Handle Login
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        alert("Please fill all fields");
        return;
      }

      try {
        const response = await fetch("https://hostel-backend-fkio.onrender.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Login saved successfully");
          loginForm.reset();
          // Redirect or show next section
        } else {
          alert(result.error || "Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Server Error. Try again later.");
      }
    });
  }
});

// Dark Mode Toggle System
const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;

// Check saved mode from localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

// Toggle Button Click
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const nav = document.querySelector(".navbar-nav");

  if (user) {
    nav.innerHTML += `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
          <img src="http://localhost:5000/uploads/${user.profileImage}" class="rounded-circle me-2" style="width:35px;height:35px;object-fit:cover;">
          ${user.username}
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
        </ul>
      </li>`;
    
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      location.reload();
    });
  }
});
