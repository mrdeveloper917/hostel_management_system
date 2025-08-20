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


//  sign_up code 
function createSignInModal() {
  const modalHTML = `
  <div class="modal fade" id="signInModal" tabindex="-1" aria-labelledby="signInModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header flex-column align-items-center text-center">
          <img src="../images/sign_in.png" alt="Sign In Logo" class="mb-2" style="height: 50px;">
          <h5 class="modal-title w-100" id="signInModalLabel">Sign In</h5>
          <button type="button" class="btn-close position-absolute end-0 me-2 mt-2" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="text-center">Get access to more learning features</p>
          <div class="d-flex justify-content-around mb-3">
            <button class="btn btn-outline-danger">
              <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google"/>
            </button>
            <button class="btn btn-outline-primary">
              <img src="https://img.icons8.com/color/24/000000/facebook-new.png" alt="Facebook"/>
            </button>
            <button class="btn btn-outline-dark">
              <img src="https://img.icons8.com/ios-glyphs/24/000000/github.png" alt="GitHub"/>
            </button>
            <button class="btn btn-outline-info">
              <img src="https://img.icons8.com/color/24/000000/linkedin.png" alt="LinkedIn"/>
            </button>
          </div>
          <div class="text-center mb-3">or</div>
          <form>
            <div class="mb-3">
              <input type="email" class="form-control" placeholder="Email">
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" placeholder="Password">
            </div>
            <div class="mb-3 text-end">
              <a href="#">Forgot your password?</a>
            </div>
            <button type="submit" class="btn btn-success w-100">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  `;

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);
}

document.addEventListener("DOMContentLoaded", function () {
  createSignInModal();
});



 
  
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
        const response = await fetch("http://localhost:5500/login", {
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
