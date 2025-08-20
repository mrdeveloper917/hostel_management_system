const API = "http://localhost:5000/api/admin";

// Load Students
async function loadStudents() {
  const res = await fetch(`${API}/students`);
  const students = await res.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((s, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.room}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editStudent('${s._id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteStudent('${s._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Load Rooms
async function loadRooms() {
  const res = await fetch(`${API}/rooms`);
  const rooms = await res.json();
  const div = document.getElementById("roomsList");
  div.innerHTML = "";
  rooms.forEach(r => {
    div.innerHTML += `
      <div class="col-md-3">
        <div class="card p-3 text-center">
          <h6>Room ${r.number}</h6>
          <p>Capacity: ${r.capacity}</p>
          <p>Occupants: ${r.occupants}</p>
        </div>
      </div>`;
  });
}

// Load Complaints
async function loadComplaints() {
  const res = await fetch(`${API}/complaints`);
  const complaints = await res.json();
  const ul = document.getElementById("complaintsList");
  ul.innerHTML = "";
  complaints.forEach(c => {
    ul.innerHTML += `<li class="list-group-item">${c.studentName}: ${c.message} <span class="badge bg-warning">${c.status}</span></li>`;
  });
}

// Init
document.getElementById("refreshBtn").addEventListener("click", () => {
  loadStudents();
  loadRooms();
  loadComplaints();
});

// first load
loadStudents();
loadRooms();
loadComplaints();
