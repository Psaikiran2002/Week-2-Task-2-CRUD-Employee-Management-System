const API_URL = 'http://localhost:5000/api/employees';

// State
let employees = [];
let sortField = 'id';
let sortAsc = false;
let deleteTargetId = null;

// DOM Elements
const tableBody = document.getElementById('employeeTableBody');
const searchInput = document.getElementById('searchInput');
const departmentFilter = document.getElementById('departmentFilter');
const loadingIndicator = document.getElementById('loadingIndicator');
const emptyState = document.getElementById('emptyState');
const alertBanner = document.getElementById('alertBanner');

// Form Modal Elements
const employeeModal = document.getElementById('employeeModal');
const modalTitle = document.getElementById('modalTitle');
const employeeForm = document.getElementById('employeeForm');
const employeeIdInput = document.getElementById('employeeId');
const nameInput = document.getElementById('empName');
const deptInput = document.getElementById('empDepartment');
const roleInput = document.getElementById('empRole');
const salaryInput = document.getElementById('empSalary');
const joinDateInput = document.getElementById('empJoinDate');

// Delete Modal Elements
const deleteModal = document.getElementById('deleteModal');
const deleteEmpName = document.getElementById('deleteEmpName');

// Initialize
document.addEventListener('DOMContentLoaded', fetchEmployees);

// Fetch All Employees
async function fetchEmployees() {
  showLoading(true);
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to load employee records.');
    employees = await response.json();
    renderTable();
  } catch (err) {
    showAlert(err.message, 'error');
  } finally {
    showLoading(false);
  }
}

// Render Table with Search, Filter, and Sort
function renderTable() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedDept = departmentFilter.value;

  let filtered = employees.filter((emp) => {
    const matchesQuery =
      emp.name.toLowerCase().includes(query) ||
      emp.role.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query);
    const matchesDept = selectedDept === '' || emp.department === selectedDept;
    return matchesQuery && matchesDept;
  });

  // Sort logic
  filtered.sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === 'salary' || sortField === 'id') {
      valA = Number(valA);
      valB = Number(valB);
    } else {
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }

    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  tableBody.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  filtered.forEach((emp) => {
    const formattedSalary = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(emp.salary);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>#${emp.id}</td>
      <td><strong>${escapeHTML(emp.name)}</strong></td>
      <td><span class="badge">${escapeHTML(emp.department)}</span></td>
      <td>${escapeHTML(emp.role)}</td>
      <td>${formattedSalary}</td>
      <td>${emp.join_date}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="openEditModal(${emp.id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${emp.id}, '${escapeHTML(emp.name)}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Column Sorting Event Listeners
document.querySelectorAll('th[data-sort]').forEach((th) => {
  th.addEventListener('click', () => {
    const field = th.getAttribute('data-sort');
    if (sortField === field) {
      sortAsc = !sortAsc;
    } else {
      sortField = field;
      sortAsc = true;
    }
    renderTable();
  });
});

// Live Search & Department Filter
searchInput.addEventListener('input', renderTable);
departmentFilter.addEventListener('change', renderTable);

// Open Add Modal
document.getElementById('openAddModalBtn').addEventListener('click', () => {
  clearFormErrors();
  employeeForm.reset();
  employeeIdInput.value = '';
  modalTitle.textContent = 'Add New Employee';
  employeeModal.classList.remove('hidden');
});

// Open Edit Modal with Pre-filled Data
window.openEditModal = function (id) {
  const emp = employees.find((e) => e.id === id);
  if (!emp) return;

  clearFormErrors();
  employeeIdInput.value = emp.id;
  nameInput.value = emp.name;
  deptInput.value = emp.department;
  roleInput.value = emp.role;
  salaryInput.value = emp.salary;
  joinDateInput.value = emp.join_date;

  modalTitle.textContent = 'Edit Employee Record';
  employeeModal.classList.remove('hidden');
};

// Close Add/Edit Modal
function closeFormModal() {
  employeeModal.classList.add('hidden');
}
document.getElementById('closeModalBtn').addEventListener('click', closeFormModal);
document.getElementById('cancelFormBtn').addEventListener('click', closeFormModal);

// Client-Side Form Validation
function validateForm() {
  clearFormErrors();
  let isValid = true;

  if (nameInput.value.trim().length < 2) {
    document.getElementById('nameError').textContent = 'Name must be at least 2 characters.';
    isValid = false;
  }
  if (!deptInput.value) {
    document.getElementById('deptError').textContent = 'Please select a department.';
    isValid = false;
  }
  if (!roleInput.value.trim()) {
    document.getElementById('roleError').textContent = 'Role is required.';
    isValid = false;
  }
  if (!salaryInput.value || Number(salaryInput.value) <= 0) {
    document.getElementById('salaryError').textContent = 'Enter a valid salary greater than 0.';
    isValid = false;
  }
  if (!joinDateInput.value) {
    document.getElementById('dateError').textContent = 'Join date is required.';
    isValid = false;
  }

  return isValid;
}

function clearFormErrors() {
  document.querySelectorAll('.error-msg').forEach((el) => (el.textContent = ''));
}

// Create or Update Employee Submit Handler
employeeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const id = employeeIdInput.value;
  const isEdit = Boolean(id);
  const url = isEdit ? `${API_URL}/${id}` : API_URL;
  const method = isEdit ? 'PUT' : 'POST';

  const payload = {
    name: nameInput.value.trim(),
    department: deptInput.value,
    role: roleInput.value.trim(),
    salary: Number(salaryInput.value),
    join_date: joinDateInput.value,
  };

  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Operation failed.');
    }

    closeFormModal();
    showAlert(
      isEdit ? 'Employee record updated successfully.' : 'New employee added successfully.',
      'success'
    );
    await fetchEmployees();
  } catch (err) {
    showAlert(err.message, 'error');
  }
});

// Delete Confirmation Modal Logic
window.openDeleteModal = function (id, name) {
  deleteTargetId = id;
  deleteEmpName.textContent = name;
  deleteModal.classList.remove('hidden');
};

function closeDeleteModal() {
  deleteTargetId = null;
  deleteModal.classList.add('hidden');
}
document.getElementById('closeDeleteModalBtn').addEventListener('click', closeDeleteModal);
document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);

document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
  if (!deleteTargetId) return;

  try {
    const response = await fetch(`${API_URL}/${deleteTargetId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete employee.');
    }

    closeDeleteModal();
    showAlert('Employee record deleted.', 'success');
    await fetchEmployees();
  } catch (err) {
    closeDeleteModal();
    showAlert(err.message, 'error');
  }
});

// Utilities
function showLoading(isLoading) {
  loadingIndicator.classList.toggle('hidden', !isLoading);
}

function showAlert(message, type) {
  alertBanner.textContent = message;
  alertBanner.className = `alert alert-${type}`;
  setTimeout(() => {
    alertBanner.classList.add('hidden');
  }, 4000);
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
