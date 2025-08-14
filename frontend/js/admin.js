const API = 'http://localhost:5000/api/admin';
const socket = io('http://localhost:5000'); // real-time updates

// DOM refs
const studentsTableBody = document.querySelector('#studentsTable tbody');
const roomsList = document.getElementById('roomsList');
const complaintsList = document.getElementById('complaintsList');

async function fetchStudents(){
  const res = await fetch(`${API}/students`);
  const students = await res.json();
  studentsTableBody.innerHTML = students.map((s,i)=>`
    <tr>
      <td>${i+1}</td>
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td>${s.roomNo||''}</td>
      <td>
        <button class="btn btn-sm btn-info" onclick="editStudent('${s._id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStudent('${s._id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

async function fetchRooms(){
  const res = await fetch(`${API}/rooms`);
  const rooms = await res.json();
  roomsList.innerHTML = rooms.map(r=>`
    <div class="col-md-3">
      <div class="p-3 border rounded">
        <h6>Room ${r.roomNo}</h6>
        <p>Status: ${r.status}</p>
        <p>Capacity: ${r.capacity||0}</p>
      </div>
    </div>
  `).join('');
}

async function fetchComplaints(){
  const res = await fetch(`${API}/complaints`);
  const list = await res.json();
  complaintsList.innerHTML = list.map(c=>`
    <li class="list-group-item">
      <strong>${c.title}</strong> — ${c.description}
      <div class="float-end">
        <button class="btn btn-sm btn-success" onclick="resolveComplaint('${c._id}')">Resolve</button>
      </div>
    </li>
  `).join('');
}

// student modal handlers
const studentModal = new bootstrap.Modal(document.getElementById('studentModal'));
document.getElementById('addStudentBtn').addEventListener('click', ()=> {
  document.getElementById('studentForm').reset();
  document.getElementById('studentId').value = '';
  studentModal.show();
});
document.getElementById('studentForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const id = document.getElementById('studentId').value;
  const payload = {
    name: document.getElementById('s_name').value,
    email: document.getElementById('s_email').value,
    roomNo: document.getElementById('s_room').value
  };
  const url = id ? `${API}/students/${id}` : `${API}/students`;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, { method, headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  if (res.ok) {
    studentModal.hide();
    await refreshAll();
  } else {
    alert('Save failed');
  }
});

window.editStudent = async (id) => {
  const res = await fetch(`${API}/students/${id}`);
  const s = await res.json();
  document.getElementById('studentId').value = s._id;
  document.getElementById('s_name').value = s.name;
  document.getElementById('s_email').value = s.email;
  document.getElementById('s_room').value = s.roomNo || '';
  studentModal.show();
};

window.deleteStudent = async (id) => {
  if (!confirm('Delete student?')) return;
  const res = await fetch(`${API}/students/${id}`, { method: 'DELETE' });
  if (res.ok) refreshAll();
};

window.resolveComplaint = async (id) => {
  const res = await fetch(`${API}/complaints/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ status: 'resolved' }) });
  if (res.ok) refreshAll();
};

async function refreshAll(){
  await Promise.all([fetchStudents(), fetchRooms(), fetchComplaints()]);
}

document.getElementById('refreshBtn').addEventListener('click', refreshAll);

// socket listeners
socket.on('student:created', refreshAll);
socket.on('student:updated', refreshAll);
socket.on('student:deleted', refreshAll);
socket.on('room:created', refreshAll);
socket.on('room:updated', refreshAll);
socket.on('complaint:created', refreshAll);
socket.on('complaint:updated', refreshAll);

// initial load
refreshAll();
