let patientId = 3;

document.getElementById("patientForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("patientName").value.trim();
  const age = document.getElementById("patientAge").value;
  const gender = document.getElementById("patientGender").value;
  const phone = document.getElementById("patientPhone").value.trim();
  const disease = document.getElementById("patientDisease").value.trim();

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>P${String(patientId).padStart(3, "0")}</td>
    <td>${escapeHTML(name)}</td>
    <td>${escapeHTML(age)}</td>
    <td>${escapeHTML(gender)}</td>
    <td>${escapeHTML(phone)}</td>
    <td>${escapeHTML(disease)}</td>
    <td><button class="danger-btn" onclick="deleteRow(this)">Delete</button></td>
  `;

  document.getElementById("patientTable").appendChild(row);
  patientId++;
  updatePatientCount();
  this.reset();
  alert("Patient registered successfully!");
});

function deleteRow(button) {
  button.closest("tr").remove();
  updatePatientCount();
}

function updatePatientCount() {
  const rows = document.querySelectorAll("#patientTable tr").length;
  document.getElementById("patientCount").textContent = 246 + rows;
}

function openAppointmentForm() {
  document.getElementById("appointmentModal").classList.remove("hidden");
}

function closeAppointmentForm() {
  document.getElementById("appointmentModal").classList.add("hidden");
}

document.getElementById("appointmentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const patient = document.getElementById("appointmentPatient").value.trim();
  const doctor = document.getElementById("appointmentDoctor").value.trim();
  const timeValue = document.getElementById("appointmentTime").value;

  const [hour, minute] = timeValue.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  const displayTime = `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;

  const item = document.createElement("div");
  item.className = "appointment";
  item.innerHTML = `<strong>${displayTime}</strong><span>${escapeHTML(patient)} — ${escapeHTML(doctor)}</span><b>Confirmed</b>`;

  document.getElementById("appointments").appendChild(item);
  document.getElementById("appointmentCount").textContent =
    Number(document.getElementById("appointmentCount").textContent) + 1;

  this.reset();
  closeAppointmentForm();
  alert("Appointment booked successfully!");
});

document.getElementById("searchPatient").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  document.querySelectorAll("#patientTable tr").forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
  });
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}
