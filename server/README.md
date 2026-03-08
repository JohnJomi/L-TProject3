# Employee Management Dashboard - Backend API

A RESTful backend API built with Node.js, Express, and SQLite for managing employee data.

## 🚀 Features

- ✅ RESTful API endpoints for CRUD operations
- ✅ SQLite database with automatic table creation
- ✅ CORS enabled for frontend integration
- ✅ Error handling with meaningful HTTP status codes
- ✅ Request validation
- ✅ Health check endpoint
- ✅ Sample data seeding on initialization
- ✅ Docker support with multi-stage builds
- ✅ Graceful shutdown handling

## 📋 Requirements

- Node.js 18+ (or use Docker)
- npm or yarn
- SQLite3 (included as npm dependency)

## 🛠️ Installation

### Local Development

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start          # Production mode
   npm run dev        # Development mode with watch
   ```

   The server will start on `http://localhost:3000`

### Docker Setup

1. **Build the backend image:**
   ```bash
   docker build -t emp-mgmt-backend ./server
   ```

2. **Run the backend container:**
   ```bash
   docker run -p 3000:3000 emp-mgmt-backend
   ```

## 📊 Database Schema

The `employees` table is automatically created on first run:

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

### Sample Data

Three sample employees are automatically inserted on first run:
- Alice Johnson (Engineering, $95,000)
- Bob Smith (Product, $85,000)
- Charlie Brown (Design, $80,000)

## 🔌 API Endpoints

### GET /employees
Fetch all employees with sorting by ID.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "department": "Engineering",
    "salary": 95000,
    "email": "alice.johnson@company.com",
    "created_at": "2026-03-08T10:00:00",
    "updated_at": "2026-03-08T10:00:00"
  },
  ...
]
```

### GET /employees/:id
Fetch a single employee by ID.

**Parameters:**
- `id` (integer) - Employee ID

**Response:**
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "department": "Engineering",
  "salary": 95000,
  "email": "alice.johnson@company.com"
}
```

**Errors:**
- `404` - Employee not found
- `400` - Invalid database query

### POST /employees
Create a new employee.

**Request Body:**
```json
{
  "name": "John Doe",
  "department": "Engineering",
  "salary": 90000,
  "email": "john.doe@company.com"
}
```

**Required Fields:** `name`, `department`, `salary`

**Response:** (201 Created)
```json
{
  "id": 4,
  "name": "John Doe",
  "department": "Engineering",
  "salary": 90000,
  "email": "john.doe@company.com",
  "created_at": "2026-03-08T11:30:00",
  "updated_at": "2026-03-08T11:30:00"
}
```

**Errors:**
- `400` - Missing required fields or database error
- `400` - Validation error

### PUT /employees/:id
Update an existing employee.

**Parameters:**
- `id` (integer) - Employee ID

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "department": "Product",
  "salary": 95000,
  "email": "john.doe.updated@company.com"
}
```

**Required Fields:** `name`, `department`, `salary`

**Response:**
```json
{
  "id": 4,
  "name": "John Doe Updated",
  "department": "Product",
  "salary": 95000,
  "email": "john.doe.updated@company.com",
  "updated_at": "2026-03-08T12:00:00"
}
```

**Errors:**
- `400` - Missing required fields or database error
- `404` - Employee not found
- `400` - Validation error

### DELETE /employees/:id
Delete an employee.

**Parameters:**
- `id` (integer) - Employee ID

**Response:**
```json
{
  "message": "Employee deleted successfully",
  "deletedID": 4
}
```

**Errors:**
- `400` - Database error
- `404` - Employee not found

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-03-08T11:30:00.000Z"
}
```

## 🔐 Error Handling

All error responses follow a consistent format:

```json
{
  "error": "Error message description",
  "code": "ERROR_CODE"
}
```

### HTTP Status Codes

- `200` - Success (GET, PUT)
- `201` - Created (POST)
- `400` - Bad Request (validation or database error)
- `404` - Not Found
- `500` - Internal Server Error

### Error Codes

- `DB_ERROR` - Database operation failed
- `VALIDATION_ERROR` - Request validation failed
- `NOT_FOUND` - Resource not found

## 🐳 Docker Compose

For a complete stack with frontend and backend:

```bash
docker-compose up
```

This will start:
- **Backend:** http://localhost:3000
- **Frontend:** http://localhost (port 80)

To stop:
```bash
docker-compose down
```

## 📁 Project Structure

```
server/
├── src/
│   └── server.js          # Main Express server and API routes
├── package.json           # Dependencies and scripts
├── Dockerfile             # Docker build configuration
├── .dockerignore           # Files to exclude from Docker
└── emp_database.db        # SQLite database (auto-created)
```

## 🔄 CORS Configuration

The API enables CORS for all origins by default:

```javascript
app.use(cors());  // Allows all origins
```

To restrict to specific origins in production:

```javascript
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:80']
}));
```

## 📝 Logging

The server logs all API operations:

```
✅ Connected to SQLite database
✅ Employees table ready
✅ Sample data inserted
✅ Retrieved 3 employees
✅ New employee created with ID: 4
✅ Employee with ID 1 updated
✅ Employee with ID 4 deleted
❌ Error messages (if any occur)
```

## 🚀 Development Tips

1. **Watch mode:**
   ```bash
   npm run dev
   ```
   Server automatically restarts on file changes.

2. **Test endpoints using curl:**
   ```bash
   # Get all employees
   curl http://localhost:3000/employees

   # Get single employee
   curl http://localhost:3000/employees/1

   # Create employee
   curl -X POST http://localhost:3000/employees \
     -H "Content-Type: application/json" \
     -d '{"name":"Jane","department":"HR","salary":80000,"email":"jane@company.com"}'

   # Update employee
   curl -X PUT http://localhost:3000/employees/1 \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice Updated","department":"Engineering","salary":98000,"email":"alice.updated@company.com"}'

   # Delete employee
   curl -X DELETE http://localhost:3000/employees/1
   ```

3. **Check health:**
   ```bash
   curl http://localhost:3000/health
   ```

## 🔧 Environment Variables

Create a `.env` file in the `server` directory (optional):

```env
PORT=3000
NODE_ENV=production
```

## 📦 Dependencies

- **express** (^4.18.2) - Web server framework
- **sqlite3** (^5.1.6) - SQLite database driver
- **cors** (^2.8.5) - Cross-origin resource sharing middleware
- **dotenv** (^16.3.1) - Environment variable management

## 🐛 Troubleshooting

### Connection Refused
- Ensure server is running: `npm start`
- Check port 3000 is not in use: `lsof -i :3000`
- Try a different port: `PORT=3001 npm start`

### CORS Errors
- Frontend must match the backend URL exactly
- Update Angular service `apiUrl` if backend is on different host

### Database Locked
- Ensure only one server instance is running
- Delete `emp_database.db` to reset database

### Port Already in Use
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [SQLite3 npm Package](https://github.com/mapbox/node-sqlite3)
- [CORS Documentation](https://github.com/expressjs/cors)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-best-practices/)

## 📄 License

MIT

## 👤 Author

John Jomi

---

**Last Updated:** March 8, 2026
