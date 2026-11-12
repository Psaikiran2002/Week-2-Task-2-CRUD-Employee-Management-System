# Employee Management System

A simple, responsive **Employee Directory** web app that lets you add, edit, delete, search, filter and sort employee records. It is built with plain **HTML, CSS and JavaScript** (no frameworks, no build tools), and it saves data in the browser using `localStorage`.

## Demo

- Video walkthrough: [`demo-video.mp4`](demo-video.mp4) (about 33 seconds)
- Screenshots: see the [Screenshots](#screenshots) section below

## Features

- **Add** a new employee through a popup form
- **Edit** any existing employee
- **Delete** an employee, with a confirmation popup
- **Search** by name, role or department (updates as you type)
- **Filter** by department
- **Sort** by any column: click a column header once for ascending, again for descending
- **Form validation** with clear inline error messages
- **Success messages** after adding, updating or deleting
- **Responsive design** that works on desktop and mobile
- **Automatic dark mode** that follows your device's theme
- **Indian currency format** for salaries (for example, ₹12,00,000)
- **Saved in your browser**, so records stay after you refresh the page

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure, table, form and popups |
| CSS3 | Styling, layout (Flexbox), responsive design, dark mode |
| JavaScript (ES5) | CRUD logic, search, filter, sort, validation |
| localStorage | Saving employee data in the browser |

## Project Structure

```
employee-management-system/
├── index.html       # Page structure (table, add/edit form, delete popup)
├── style.css        # All styling, responsive rules and dark mode
├── script.js        # Add, edit, delete, search, filter, sort and validation
├── demo-video.mp4   # Video walkthrough
├── screenshots/     # Screenshots of every feature
└── README.md        # Project documentation
```

## How to Run

No installation is needed.

1. Download or clone this project folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox or Safari).

Optionally, you can run it with a local server such as the VS Code **Live Server** extension.

## How to Use

1. **Add:** click **+ Add Employee**, fill in the form and click **Save Employee**.
2. **Edit:** click **Edit** on a row, change the details and click **Save Employee**.
3. **Delete:** click **Delete** on a row, then confirm in the popup.
4. **Search:** type in the search box to match a name, role or department.
5. **Filter:** pick a department from the dropdown.
6. **Sort:** click any column heading in the table.

## Employee Fields and Validation

| Field | Rule |
|-------|------|
| Full Name | Required, at least 2 characters |
| Department | Required. One of: Engineering, Product, Design, Human Resources, Finance, Sales |
| Role / Designation | Required |
| Annual Salary (₹) | Required, must be a positive number |
| Join Date | Required, valid date |

The ID is generated automatically (highest existing ID + 1).

## Sample Data

On the first run the app loads 6 sample employees (IDs 1 to 6) so the table is not empty. After that, everything you change is saved in your browser.

## Screenshots

### Main page and search tools

| Home | Search | Filter by department |
|------|--------|----------------------|
| ![Home](screenshots/01-home.png) | ![Search](screenshots/02-search.png) | ![Filter](screenshots/03-filter-department.png) |

### Sorting

![Sort by salary](screenshots/04-sort-salary.png)

### Add employee

| Empty form | Validation errors | Filled form |
|------------|-------------------|-------------|
| ![Add form](screenshots/05-add-form-empty.png) | ![Validation](screenshots/06-validation-errors.png) | ![Filled](screenshots/07-add-form-filled.png) |

![Employee added](screenshots/08-employee-added.png)

### Edit employee

| Edit form | Employee updated |
|-----------|------------------|
| ![Edit form](screenshots/09-edit-form.png) | ![Updated](screenshots/10-employee-updated.png) |

### Delete employee

| Confirmation popup | Employee deleted |
|--------------------|------------------|
| ![Confirm delete](screenshots/11-delete-confirmation.png) | ![Deleted](screenshots/12-employee-deleted.png) |

### Mobile and dark mode

| Mobile view | Dark mode |
|-------------|-----------|
| <img src="screenshots/13-mobile-view.png" width="250" alt="Mobile view" /> | ![Dark mode](screenshots/14-dark-mode.png) |

## Notes and Limitations

- **Front-end only.** There is no server, REST API or database. Data lives in `localStorage`, so it is private to one browser on one device and is not shared.
- To reset the data, delete the `hr_employees_v1` key in your browser's developer tools (Application → Local Storage).
- If you delete every employee and reload the page, the 6 sample employees come back, because an empty list is treated as "first run".
- The table opens sorted by ID in descending order, so the newest employee appears first.

## Future Improvements

- Add a backend (Node.js/Express or Django) with a REST API and a database such as MySQL or MongoDB
- Add a Postman collection for the API
- Add pagination and CSV export
- Add login and user roles
 
 ## GITHUB-HUB LINK

## LIVE PROJECT LINK
   https://claude.ai/artifact/9SP/phsirFD9aPZpgmdybW1
   
