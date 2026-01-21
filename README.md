# Employee Management Dashboard

Simple Angular project for learning fundamentals.

## What it does

Shows a list of employees with their details (name, role, department, salary).

## Features

- Display employee list
- Uses Angular directives (*ngIf, *ngFor)
- TypeScript for type safety
- Standalone components
- Simple styling

## How to run

```bash
npm install
npm start
```

Go to http://localhost:4200

## Project Structure

```
src/app/
├── components/
│   ├── navbar/          - Header component
│   └── employee-list/   - Main employee display
├── models/
│   └── employee.model.ts - Employee interface
├── app.ts               - Root component
└── app.html
```

## Key Angular Concepts

- **Standalone Components** - Components without NgModule
- **TypeScript Interface** - Type safety for Employee data
- **Data Binding** - Display data with {{ }}
- ***ngFor** - Loop through employees
- ***ngIf** - Show/hide content
- **Component Imports** - Explicit dependencies
