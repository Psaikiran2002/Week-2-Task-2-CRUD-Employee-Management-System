(function () {
  var KEY = 'hr_employees_v1';
  var seed = [
    { id: 1, name: 'Aarav Patel', department: 'Engineering', role: 'Frontend Engineer', salary: 1200000, join_date: '2022-03-14' },
    { id: 2, name: 'Sneha Reddy', department: 'Product', role: 'Product Manager', salary: 1800000, join_date: '2021-07-01' },
    { id: 3, name: 'Kiran Rao', department: 'Design', role: 'UI Designer', salary: 900000, join_date: '2023-01-09' },
    { id: 4, name: 'Meera Nair', department: 'Human Resources', role: 'HR Executive', salary: 700000, join_date: '2022-11-21' },
    { id: 5, name: 'Rohan Gupta', department: 'Finance', role: 'Accountant', salary: 800000, join_date: '2020-05-18' },
    { id: 6, name: 'Divya Sharma', department: 'Sales', role: 'Sales Lead', salary: 1100000, join_date: '2021-09-30' }
  ];
  var data = [];
  try { data = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { data = []; }
  if (!Array.isArray(data) || !data.length) data = seed.slice();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }

  var $ = function (id) { return document.getElementById(id); };
  var sortKey = 'id', sortDir = 'desc', deleteId = null, timer;

  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function alertMsg(msg, type) {
    var b = $('alertBanner');
    b.textContent = msg; b.className = 'alert ' + type;
    clearTimeout(timer); timer = setTimeout(function () { b.className = 'alert hidden'; }, 3000);
  }

  function render() {
    var q = $('searchInput').value.trim().toLowerCase(), dep = $('departmentFilter').value;
    var rows = data.filter(function (e) {
      return (!dep || e.department === dep) &&
        (!q || (e.name + ' ' + e.role + ' ' + e.department).toLowerCase().indexOf(q) > -1);
    });
    rows.sort(function (a, b) {
      var x = a[sortKey], y = b[sortKey], r = typeof x === 'number' ? x - y : String(x).localeCompare(String(y));
      return sortDir === 'asc' ? r : -r;
    });
    $('employeeTableBody').innerHTML = rows.map(function (e) {
      return '<tr><td>' + e.id + '</td><td>' + esc(e.name) + '</td><td>' + esc(e.department) + '</td><td>' + esc(e.role) +
        '</td><td>₹' + Number(e.salary).toLocaleString('en-IN') + '</td><td>' + e.join_date +
        '</td><td><button class="btn btn-secondary btn-sm" data-edit="' + e.id + '">Edit</button>' +
        '<button class="btn btn-danger btn-sm" data-del="' + e.id + '">Delete</button></td></tr>';
    }).join('');
    $('emptyState').classList.toggle('hidden', rows.length > 0);
  }

  function openForm(emp) {
    ['nameError', 'deptError', 'roleError', 'salaryError', 'dateError'].forEach(function (i) { $(i).textContent = ''; });
    $('modalTitle').textContent = emp ? 'Edit Employee' : 'Add New Employee';
    $('employeeId').value = emp ? emp.id : '';
    $('empName').value = emp ? emp.name : '';
    $('empDepartment').value = emp ? emp.department : '';
    $('empRole').value = emp ? emp.role : '';
    $('empSalary').value = emp ? emp.salary : '';
    $('empJoinDate').value = emp ? emp.join_date : '';
    $('employeeModal').classList.remove('hidden');
  }
  function closeForm() { $('employeeModal').classList.add('hidden'); }
  function closeDel() { $('deleteModal').classList.add('hidden'); deleteId = null; }

  $('openAddModalBtn').onclick = function () { openForm(null); };
  $('closeModalBtn').onclick = closeForm;
  $('cancelFormBtn').onclick = closeForm;
  $('closeDeleteModalBtn').onclick = closeDel;
  $('cancelDeleteBtn').onclick = closeDel;
  $('searchInput').oninput = render;
  $('departmentFilter').onchange = render;

  document.querySelectorAll('th[data-sort]').forEach(function (th) {
    th.onclick = function () {
      var k = th.dataset.sort;
      if (sortKey === k) sortDir = sortDir === 'asc' ? 'desc' : 'asc'; else { sortKey = k; sortDir = 'asc'; }
      render();
    };
  });

  $('employeeTableBody').onclick = function (ev) {
    var t = ev.target, id;
    if (t.dataset.edit) {
      id = Number(t.dataset.edit);
      openForm(data.filter(function (e) { return e.id === id; })[0]);
    } else if (t.dataset.del) {
      id = Number(t.dataset.del); deleteId = id;
      $('deleteEmpName').textContent = data.filter(function (e) { return e.id === id; })[0].name;
      $('deleteModal').classList.remove('hidden');
    }
  };

  $('confirmDeleteBtn').onclick = function () {
    data = data.filter(function (e) { return e.id !== deleteId; });
    save(); closeDel(); render(); alertMsg('Employee deleted successfully.', 'success');
  };

  $('employeeForm').onsubmit = function (ev) {
    ev.preventDefault();
    var name = $('empName').value.trim(), dep = $('empDepartment').value, role = $('empRole').value.trim(),
      sal = Number($('empSalary').value), date = $('empJoinDate').value, ok = true;
    function chk(cond, id, msg) { $(id).textContent = cond ? '' : msg; if (!cond) ok = false; }
    chk(name.length >= 2, 'nameError', 'Name must be at least 2 characters.');
    chk(!!dep, 'deptError', 'Department is required.');
    chk(!!role, 'roleError', 'Role is required.');
    chk(sal > 0, 'salaryError', 'Salary must be a positive number.');
    chk(!!date, 'dateError', 'A valid join date is required.');
    if (!ok) return;
    var id = $('employeeId').value;
    if (id) {
      var emp = data.filter(function (e) { return e.id === Number(id); })[0];
      emp.name = name; emp.department = dep; emp.role = role; emp.salary = sal; emp.join_date = date;
      alertMsg('Employee updated successfully.', 'success');
    } else {
      var next = data.reduce(function (m, e) { return Math.max(m, e.id); }, 0) + 1;
      data.push({ id: next, name: name, department: dep, role: role, salary: sal, join_date: date });
      alertMsg('Employee added successfully.', 'success');
    }
    save(); closeForm(); render();
  };

  render();
})();
