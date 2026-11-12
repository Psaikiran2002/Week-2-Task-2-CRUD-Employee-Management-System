# HR Employee Management System

A simple Employee Directory built with plain HTML, CSS and JavaScript (no frameworks, no build step).

## Features
- Add, edit and delete employees (with a delete confirmation popup)
- Search by name, role or department
- Filter by department
- Sort by any column (click the column header)
- Form validation with inline error messages
- Responsive layout and automatic dark mode
- Data is saved in the browser using `localStorage`

## Project Structure
```
employee-management-system/
├── index.html   # page structure (table, modals, form)
├── style.css    # all styling
├── script.js    # CRUD logic, search, sort, validation
└── README.md
```

## How to Run
1. Download or clone this folder.
2. Open `index.html` in any modern browser (double-click it).

No installation is needed.

## Employee Fields
| Field | Rule |
|-------|------|
| Full Name | required, at least 2 characters |
| Department | required (Engineering, Product, Design, Human Resources, Finance, Sales) |
| Role | required |
| Annual Salary (₹) | required, positive number |
| Join Date | required |

## Notes
- Data lives only in your browser, so it is not shared between browsers or devices.
- Clear it by deleting the `hr_employees_v1` key from localStorage.
- The app loads 6 sample employees the first time it runs.
