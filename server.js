const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Validation Helper
function validateEmployeeInput({ name, department, role, salary, join_date }) {
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return 'Name is required and must be at least 2 characters.';
  }
  if (!department || typeof department !== 'string' || !department.trim()) {
    return 'Department is required.';
  }
  if (!role || typeof role !== 'string' || !role.trim()) {
    return 'Role is required.';
  }
  const numericSalary = Number(salary);
  if (isNaN(numericSalary) || numericSalary <= 0) {
    return 'Salary must be a positive number.';
  }
  if (!join_date || isNaN(Date.parse(join_date))) {
    return 'A valid join date is required.';
  }
  return null;
}

// 1. GET all employees
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, department, role, salary, TO_CHAR(join_date, \'YYYY-MM-DD\') AS join_date FROM employees ORDER BY id DESC'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching employees:', err.message);
    res.status(500).json({ error: 'Internal server error while fetching employees.' });
  }
});

// 2. GET single employee by ID
app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid employee ID format.' });
  }

  try {
    const result = await pool.query(
      'SELECT id, name, department, role, salary, TO_CHAR(join_date, \'YYYY-MM-DD\') AS join_date FROM employees WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching employee:', err.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// 3. POST create new employee
app.post('/api/employees', async (req, res) => {
  const validationError = validateEmployeeInput(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { name, department, role, salary, join_date } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO employees (name, department, role, salary, join_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, department, role, salary, TO_CHAR(join_date, 'YYYY-MM-DD') AS join_date`,
      [name.trim(), department.trim(), role.trim(), Number(salary), join_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating employee:', err.message);
    res.status(500).json({ error: 'Failed to create employee record.' });
  }
});

// 4. PUT update existing employee
app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid employee ID format.' });
  }

  const validationError = validateEmployeeInput(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { name, department, role, salary, join_date } = req.body;

  try {
    const result = await pool.query(
      `UPDATE employees
       SET name = $1, department = $2, role = $3, salary = $4, join_date = $5
       WHERE id = $6
       RETURNING id, name, department, role, salary, TO_CHAR(join_date, 'YYYY-MM-DD') AS join_date`,
      [name.trim(), department.trim(), role.trim(), Number(salary), join_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating employee:', err.message);
    res.status(500).json({ error: 'Failed to update employee record.' });
  }
});

// 5. DELETE employee
app.delete('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid employee ID format.' });
  }

  try {
    const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found.' });
    }
    res.status(200).json({ message: 'Employee deleted successfully.', id: Number(id) });
  } catch (err) {
    console.error('Error deleting employee:', err.message);
    res.status(500).json({ error: 'Failed to delete employee record.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
