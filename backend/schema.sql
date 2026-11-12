CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    role VARCHAR(100) NOT NULL,
    salary NUMERIC(12, 2) NOT NULL CHECK (salary > 0),
    join_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster search and sorting by department and name
CREATE INDEX idx_employees_name ON employees(name);
CREATE INDEX idx_employees_department ON employees(department);

-- Seed sample data
INSERT INTO employees (name, department, role, salary, join_date) VALUES
('Ananya Sharma', 'Engineering', 'Senior Backend Developer', 1450000.00, '2023-04-15'),
('Rohan Verma', 'Product', 'Product Manager', 1600000.00, '2022-11-01'),
('Priya Nair', 'Human Resources', 'HR Business Partner', 950000.00, '2024-01-10'),
('Vikram Singh', 'Design', 'Lead UI/UX Designer', 1200000.00, '2023-08-22');
