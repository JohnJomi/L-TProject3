# Employee Management Dashboard

Simple Angular project for learning fundamentals with full CRUD operations.

## What it does

A complete employee management system that displays a list of employees with their details (name, role, department, salary) and allows you to add, edit, and delete employees.

## Features

✨ **Core Features:**
- Display employee list in clean card format
- Add new employees via form
- Edit existing employee details
- Delete employees with confirmation
- Real-time updates to the employee list
- Professional UI with simple styling

🎯 **Angular Concepts:**
- Standalone components (no NgModule)
- Two-way data binding with [(ngModel)]
- Angular directives (*ngIf, *ngFor)
- TypeScript interfaces for type safety
- Services for state management
- Form handling with FormsModule
- Component composition and communication

## How to run

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Go to http://localhost:4200

## Project Structure

```
src/app/
├── components/
│   ├── navbar/              - Header with Add Employee button
│   └── employee-list/       - Employee display & CRUD operations
├── services/
│   └── employee.service.ts  - Manages form state
├── models/
│   └── employee.model.ts    - Employee interface
├── app.ts                   - Root component
└── app.html
```

## Using the App

### Add Employee
1. Click "➕ Add Employee" button in the navbar
2. Fill in the form fields (name, role, department, salary)
3. Click "Add Employee" button
4. New employee appears in the list

### Edit Employee
1. Click the **Edit** button (black) on any employee card
2. Update the form fields
3. Click **Save** to update or **Cancel** to discard changes

### Delete Employee
1. Click the **Delete** button (white) on any employee card
2. Confirm the deletion when prompted
3. Employee is removed from the list

## Key Angular Concepts Implemented

### 1. **Standalone Components**
```typescript
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule]
})
```

### 2. **Two-Way Data Binding**
```html
<input [(ngModel)]="formData.name">
```

### 3. **TypeScript Interface**
```typescript
export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  salary: number;
}
```

### 4. **Structural Directives**
```html
<!-- Conditional rendering -->
<div *ngIf="showAddForm">...</div>

<!-- List iteration -->
<div *ngFor="let emp of employees">...</div>
```

### 5. **Services & State Management**
```typescript
// EmployeeService manages form visibility state
this.employeeService.addEmployee$.subscribe((show) => {
  this.showAddForm = show;
});
```

### 6. **Form Handling**
- Reactive form handling with ngSubmit
- Input validation
- Form reset after submission

## Technologies Used

- **Framework:** Angular 17+
- **Language:** TypeScript 5.9+
- **Styling:** Plain CSS with component scoping
- **State Management:** RxJS (BehaviorSubject)
- **Form Handling:** FormsModule (ngModel)

## Project Scope

This project demonstrates Angular fundamentals suitable for academic evaluation (CIA-2):
- ✅ Component architecture
- ✅ Data binding and directives
- ✅ TypeScript for type safety
- ✅ CRUD operations
- ✅ Service-based state management
- ✅ Form handling

**Not included (by design):**
- ❌ Backend API integration
- ❌ Advanced routing
- ❌ Complex state management (NgRx)
- ❌ Authentication/Authorization

## File Summary

| File | Purpose |
|------|---------|
| `navbar.ts` | Header component with Add button |
| `navbar.html` | Navigation layout |
| `navbar.css` | Navbar styling |
| `employee-list.ts` | Main component with CRUD logic |
| `employee-list.html` | Add/Edit forms and employee cards |
| `employee-list.css` | Component styling |
| `employee.service.ts` | Manages form state with RxJS |
| `employee.model.ts` | TypeScript interface for type safety |

## How It Works

1. **Navbar** provides the "Add Employee" button
2. Clicking the button emits an event via **EmployeeService**
3. **EmployeeList** component subscribes to the event and shows/hides the form
4. Users fill the form and submit to add/edit/delete employees
5. All changes are reflected immediately in the employee list

## Learning Outcomes

After working with this project, you'll understand:
- How to build standalone Angular components
- Two-way data binding with ngModel
- Structural directives (*ngIf, *ngFor)
- TypeScript interfaces and type safety
- Angular services and RxJS observables
- Form handling and validation
- Component communication
- CRUD operations in Angular

---

**GitHub Repository:** https://github.com/JohnJomi/L-TProject3

**Last Updated:** January 2026

