# CRUD Employee Management System

A full-stack web application built for HR administrators to manage employee records with full Create, Read, Update, and Delete (CRUD) capabilities, client/server validation, live search, and multi-column sorting.

## Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Setup Instructions

### 1. Database Setup
1. Ensure PostgreSQL is installed and running.
2. Execute the schema script to create the database, tables, indexes, and seed data:
   ```bash
   psql -U postgres -f backend/schema.sql
   ```

### 2. Backend Setup
1. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Update `backend/.env` with your PostgreSQL credentials.
3. Start the Express server:
   ```bash
   npm start
   ```
   The API will run at `http://localhost:5000`.

### 3. Frontend Setup
Open `frontend/index.html` using VS Code Live Server (or any static HTTP server) at `http://127.0.0.1:5500`.

## API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/employees` | Retrieve all employee records |
| `GET` | `/api/employees/:id` | Retrieve a single employee by ID |
| `POST` | `/api/employees` | Create a new employee record |
| `PUT` | `/api/employees/:id` | Update an existing employee record |
| `DELETE` | `/api/employees/:id` | Delete an employee record |

### GITHUB LINK
 https://psaikiran2002.github.io/Week-2-Task-2-CRUD-Employee-Management-System/

### PROJECT LIVE LINK
 https://claude.ai/artifact/9SPphsirFd9aPZpgmdybW1
