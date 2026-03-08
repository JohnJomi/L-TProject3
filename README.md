# Employee Management Dashboard - Full Stack Application

A modern, responsive employee management web application built with Angular 17, Material Design, Node.js, Express, and SQLite.

## 🚀 Features

### Frontend
- ✅ Angular 17 standalone components
- ✅ Material Design UI with responsive layout
- ✅ Real-time employee search by name
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Material Dialog with backdrop overlay
- ✅ Reactive BehaviorSubject architecture with RxJS
- ✅ Async pipe pattern for memory efficiency
- ✅ Responsive grid layout (mobile-friendly)
- ✅ Material Icons and Roboto fonts

### Backend
- ✅ Node.js + Express REST API
- ✅ SQLite database
- ✅ Complete CRUD endpoints
- ✅ CORS enabled
- ✅ Error handling with meaningful status codes
- ✅ Automatic sample data seeding
- ✅ Health check endpoint

## 📋 Requirements

### Development
- Node.js 18+
- Angular CLI 17+
- npm or yarn

### Production
- Docker & Docker Compose (recommended)
- Or Node.js 18+ for manual deployment

## 🛠️ Installation & Setup

### Option 1: Local Development (Frontend + Backend)

#### Backend Setup
```bash
cd server
npm install
npm start
# Server runs on http://localhost:3000
```

#### Frontend Setup (new terminal)
```bash
npm install
npm start
# App runs on http://localhost:4200
```

The Angular frontend will automatically connect to the backend at `http://localhost:3000/employees`.

### Option 2: Docker Compose (Recommended for Production)

```bash
# Build and run everything
docker-compose up --build

# Frontend: http://localhost
# Backend: http://localhost:3000
```

To stop:
```bash
docker-compose down
```

### Option 3: Individual Docker Images

#### Build Backend
```bash
docker build -t emp-mgmt-backend ./server
docker run -p 3000:3000 emp-mgmt-backend
```

#### Build Frontend
```bash
docker build -t emp-mgmt-frontend .
docker run -p 80:80 emp-mgmt-frontend
```

## 📁 Project Structure

```
employee-management-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── employee-list/        # Main dashboard
│   │   │   ├── employee-detail/      # Detail dialog
│   │   │   ├── employee-form/        # Add/Edit form
│   │   │   └── navbar/               # Navigation bar
│   │   ├── models/
│   │   │   └── employee.model.ts     # Employee interface
│   │   ├── services/
│   │   │   └── employee.service.ts   # HTTP service (NOW USES REAL API)
│   │   ├── pipes/
│   │   │   └── employee-search.pipe.ts   # Name-based search
│   │   ├── directives/
│   │   │   └── highlight-salary.directive.ts
│   │   ├── app.ts                    # Root component
│   │   └── app.routes.ts             # Route definitions
│   ├── index.html
│   ├── styles.css                    # Global styles (Material theme)
│   └── main.ts
├── server/
│   ├── src/
│   │   └── server.js                 # Express API server
│   ├── package.json
│   ├── Dockerfile
│   ├── README.md
│   └── emp_database.db               # SQLite database
├── public/
│   └── favicon.ico
├── Dockerfile                        # Frontend multi-stage build
├── nginx.conf                        # Nginx configuration
├── docker-compose.yml                # Docker Compose config
├── package.json
├── angular.json
└── README.md                         # This file
```

## 🔌 API Integration

### Employee Service Updates

The `EmployeeService` now calls the real backend API:

**Before (Mock Data):**
```typescript
private apiUrl = '/assets/employees.json';
```

**After (Real Backend):**
```typescript
private apiUrl = 'http://localhost:3000/employees';
```

All CRUD methods now use HTTP requests:
- `getEmployees()` - GET /employees
- `getEmployeeById(id)` - GET /employees/:id
- `addEmployee(emp)` - POST /employees
- `updateEmployee(emp)` - PUT /employees/:id
- `deleteEmployee(id)` - DELETE /employees/:id

### BehaviorSubject Pattern Maintained

Despite using real API calls, the reactive BehaviorSubject pattern is preserved:

```typescript
// Service maintains single source of truth
private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);
employees$ = this.employeesSubject.asObservable();

// Component consumes with async pipe
<div *ngIf="employees$ | async as employees">
  <div *ngFor="let emp of (employees | employeeSearch:searchTerm)">
```

## 📊 Backend API Endpoints

All endpoints return JSON responses with proper HTTP status codes.

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/employees` | Get all employees |
| GET | `/employees/:id` | Get employee by ID |
| POST | `/employees` | Create new employee |
| PUT | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Delete employee |
| GET | `/health` | Health check |

### Example API Calls

```bash
# Get all employees
curl http://localhost:3000/employees

# Get single employee
curl http://localhost:3000/employees/1

# Create employee
curl -X POST http://localhost:3000/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","department":"HR","salary":80000,"email":"jane@company.com"}'

# Update employee
curl -X PUT http://localhost:3000/employees/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Updated","department":"HR","salary":85000,"email":"jane.updated@company.com"}'

# Delete employee
curl -X DELETE http://localhost:3000/employees/1
```

## 🎨 UI Features

### Employee List View
- Responsive card-based grid layout
- Real-time employee name search
- View/Edit/Delete buttons for each employee
- Loading state with spinner

### Add/Edit Employee
- Form validation
- Name, Department, Salary, Email fields
- Submit and Cancel buttons

### Employee Detail View
- Material Dialog with dark backdrop overlay
- Read-only display of employee information
- Close button

### Responsive Design
- Mobile-first approach
- CSS Grid with auto-fit columns
- Adapts to all screen sizes
- Touch-friendly buttons and spacing

## 🔐 Security Notes

### CORS Policy
- Backend allows all origins (change in production)
- Located in `server/src/server.js`: `app.use(cors())`

### Database
- SQLite file stored in `server/emp_database.db`
- In Docker, volume-mounted for persistence

### Frontend
- No secrets in frontend code
- API URL configured as `http://localhost:3000`

### Production Recommendations
1. Use environment variables for API URLs
2. Restrict CORS to known domains
3. Add authentication/authorization
4. Use HTTPS for all communications
5. Implement request validation and rate limiting

## 📈 Development Workflow

### Frontend Development
```bash
# Start dev server with hot reload
npm start

# Run tests
npm test

# Build for production
npm run build -- --configuration production
```

### Backend Development
```bash
cd server

# Development mode with watch
npm run dev

# Production mode
npm start

# Test endpoints
npm run test  # (if tests added)
```

### Full Stack Development
```bash
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend
npm start

# Application is now running:
# Frontend: http://localhost:4200
# Backend: http://localhost:3000
# Database: ./server/emp_database.db
```

## 🐳 Docker Deployment

### Build All Images
```bash
docker-compose up --build
```

### View Logs
```bash
docker-compose logs -f
```

### Access Services
- **Frontend:** http://localhost
- **Backend API:** http://localhost/api/employees (through Nginx proxy)
- **Direct Backend:** http://localhost:3000/employees

### Stop Services
```bash
docker-compose down
```

### Remove Volumes
```bash
docker-compose down -v
```

## 📝 Nginx Configuration

The Nginx container serves the Angular app and proxies API requests to the backend:

```nginx
# Serve Angular app
location / {
  try_files $uri $uri/ /index.html;
}

# Proxy API requests
location /api/ {
  proxy_pass http://backend:3000/;
}
```

This allows the frontend to call `http://localhost/api/employees` instead of exposing the backend directly.

## 🔧 Environment Configuration

### Frontend (.env equivalent)
Configure in `src/app/services/employee.service.ts`:
```typescript
private apiUrl = 'http://localhost:3000/employees';  // Development
private apiUrl = '/api/employees';                   // Production (with Nginx)
```

### Backend (.env file)
Create `server/.env`:
```env
PORT=3000
NODE_ENV=production
DATABASE_PATH=./emp_database.db
```

## 📊 Database Schema

### Employees Table
```sql
CREATE TABLE employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary REAL NOT NULL,
  email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Data (Auto-seeded)
- Alice Johnson - Engineering - $95,000
- Bob Smith - Product - $85,000
- Charlie Brown - Design - $80,000

## 🚀 Performance Optimization

### Frontend
- ✅ Async pipe prevents memory leaks
- ✅ Lazy loading of components
- ✅ Responsive image sizing
- ✅ Material Design optimizations

### Backend
- ✅ Indexed primary key lookups
- ✅ Efficient SQL queries
- ✅ GZIP compression enabled
- ✅ Connection pooling ready

### Docker
- ✅ Alpine images for smaller size
- ✅ Multi-stage builds for frontend
- ✅ Layer caching optimization
- ✅ Volume persistence for database

## 🐛 Troubleshooting

### "Cannot GET /employees"
**Frontend cannot reach backend**
- Ensure backend is running: `cd server && npm start`
- Check backend is on port 3000
- Verify `apiUrl` in `employee.service.ts` is correct
- Check browser console for CORS errors

### "CORS Error" in Browser Console
**Frontend blocked by CORS policy**
- Backend must have `app.use(cors())` (it does)
- Check backend is actually running
- Verify frontend is making requests to correct origin

### Database Locked
**"SQLITE_BUSY: database is locked"**
- Only one server process should access database
- Restart backend: `npm start`
- Reset database: `rm server/emp_database.db`

### Port Already in Use
```bash
# macOS/Linux - Find and kill process
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Docker Container Won't Start
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild
docker-compose down
docker-compose up --build

# Full reset
docker-compose down -v
docker-compose up --build
```

## 📚 Technology Stack

### Frontend
- Angular 17.0.0
- Angular Material 21.2.0
- RxJS 7.8.0
- TypeScript 5.9.2
- Bootstrap Grid (CSS Grid)

### Backend
- Node.js 18+ (Alpine)
- Express 4.18.2
- SQLite3 5.1.6
- CORS 2.8.5

### DevOps
- Docker & Docker Compose
- Nginx (production serving)
- Multi-stage builds

## 📄 Files Changed

### New Backend Files
- ✅ `server/package.json` - Backend dependencies
- ✅ `server/src/server.js` - Express server and API routes
- ✅ `server/Dockerfile` - Backend Docker config
- ✅ `server/README.md` - Backend documentation

### New Frontend Docker Files
- ✅ `Dockerfile` - Multi-stage Angular build
- ✅ `nginx.conf` - Nginx reverse proxy config
- ✅ `.dockerignore` - Exclude files from build

### Orchestration
- ✅ `docker-compose.yml` - Full stack setup

### Updated Angular Files
- ✅ `src/app/services/employee.service.ts` - Uses real API
- ✅ `src/app/models/employee.model.ts` - Added email field

## 🎯 Next Steps

### Short Term
1. Test all CRUD operations locally
2. Verify Docker build and deployment
3. Test responsive design on mobile
4. Verify search functionality

### Medium Term
1. Add pagination for large datasets
2. Add column sorting
3. Add advanced filtering
4. Implement authentication

### Long Term
1. Add data export (CSV/PDF)
2. Add user roles and permissions
3. Add activity logging
4. Add API documentation (Swagger)
5. Add automated testing

## 📞 Support

For issues or questions:
1. Check logs: `npm start` output
2. Check browser console for errors
3. Verify backend is running on port 3000
4. Review CORS configuration
5. Check database file exists and is readable

## 📄 License

MIT

## 👤 Author

John Jomi

---

**Last Updated:** March 8, 2026
**Status:** ✅ Production Ready - Full Stack with Real Backend

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

