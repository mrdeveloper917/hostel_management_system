document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/students")
    .then(res => res.json())
    .then(data => {
      renderTable(data);
      updateSummary(data);

      // Search filter
      document.getElementById("searchInput").addEventListener("input", function () {
        const value = this.value.toLowerCase();
        const filtered = data.filter(student =>
          student.name.toLowerCase().includes(value)
        );
        renderTable(filtered);
      });
    })
    .catch(err => {
      console.error("Fetch error:", err);
    });
});

function renderTable(data) {
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";
  data.forEach((student, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.room}</td>
        <td>${student.branch}</td>
        <td>${student.date}</td>
      </tr>
    `;
  });
}

function updateSummary(data) {
  document.getElementById("studentCount").textContent = data.length;

  const uniqueRooms = new Set(data.map(s => s.room));
  document.getElementById("roomCount").textContent = uniqueRooms.size;

  const uniqueBranches = new Set(data.map(s => s.branch));
  document.getElementById("branchCount").textContent = uniqueBranches.size;
}
