import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new (sqlite3.verbose()).Database(
  path.join(__dirname, '../emp_database.db'),
  (err) => {
    if (err) {
      console.error('❌ Database connection error:', err.message);
      process.exit(1);
    }
    console.log('✅ Connected to SQLite database');
  }
);

// Create employees table if it doesn't exist
const createTableSql = `
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    salary REAL NOT NULL,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

db.run(createTableSql, (err) => {
  if (err) {
    console.error('❌ Table creation error:', err.message);
  } else {
    console.log('✅ Employees table ready');
    // Insert sample data if table is empty
    insertSampleData();
  }
});

// Insert sample data if table is empty
function insertSampleData() {
  db.get('SELECT COUNT(*) as count FROM employees', (err, row) => {
    if (err) {
      console.error('❌ Error checking table:', err.message);
      return;
    }

    if (row.count === 0) {
      const sampleEmployees = [
        {
          name: 'Alice Johnson',
          department: 'Engineering',
          salary: 95000,
          email: 'alice.johnson@company.com'
        },
        {
          name: 'Bob Smith',
          department: 'Product',
          salary: 85000,
          email: 'bob.smith@company.com'
        },
        {
          name: 'Charlie Brown',
          department: 'Design',
          salary: 80000,
          email: 'charlie.brown@company.com'
        }
      ];

      const insertSql = `
        INSERT INTO employees (name, department, salary, email)
        VALUES (?, ?, ?, ?)
      `;

      sampleEmployees.forEach((emp) => {
        db.run(insertSql, [emp.name, emp.department, emp.salary, emp.email], (err) => {
          if (err) {
            console.error('❌ Error inserting sample data:', err.message);
          }
        });
      });

      console.log('✅ Sample data inserted');
    }
  });
}

// ============ API ENDPOINTS ============

// GET /employees - Fetch all employees
app.get('/employees', (req, res) => {
  const sql = 'SELECT * FROM employees ORDER BY id ASC';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('❌ GET /employees error:', err.message);
      return res.status(500).json({ error: err.message, code: 'DB_ERROR' });
    }

    console.log(`✅ Retrieved ${rows.length} employees`);
    res.json(rows);
  });
});

// GET /employees/:id - Fetch one employee by ID
app.get('/employees/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM employees WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(`❌ GET /employees/${id} error:`, err.message);
      return res.status(400).json({ error: err.message, code: 'DB_ERROR' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Employee not found', code: 'NOT_FOUND' });
    }

    console.log(`✅ Retrieved employee with ID: ${id}`);
    res.json(row);
  });
});

// POST /employees - Add a new employee
app.post('/employees', (req, res) => {
  const { name, department, salary, email } = req.body;

  // Validation
  if (!name || !department || salary === undefined || salary === null) {
    return res.status(400).json({
      error: 'Missing required fields: name, department, salary',
      code: 'VALIDATION_ERROR'
    });
  }

  const sql = `
    INSERT INTO employees (name, department, salary, email)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [name, department, salary, email], function (err) {
    if (err) {
      console.error('❌ POST /employees error:', err.message);
      return res.status(400).json({ error: err.message, code: 'DB_ERROR' });
    }

    console.log(`✅ New employee created with ID: ${this.lastID}`);
    res.status(201).json({
      id: this.lastID,
      name,
      department,
      salary,
      email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  });
});

// PUT /employees/:id - Update an existing employee
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, department, salary, email } = req.body;

  // Validation
  if (!name || !department || salary === undefined || salary === null) {
    return res.status(400).json({
      error: 'Missing required fields: name, department, salary',
      code: 'VALIDATION_ERROR'
    });
  }

  const sql = `
    UPDATE employees
    SET name = ?, department = ?, salary = ?, email = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(sql, [name, department, salary, email, id], function (err) {
    if (err) {
      console.error(`❌ PUT /employees/${id} error:`, err.message);
      return res.status(400).json({ error: err.message, code: 'DB_ERROR' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Employee not found', code: 'NOT_FOUND' });
    }

    console.log(`✅ Employee with ID ${id} updated`);
    res.json({
      id: parseInt(id),
      name,
      department,
      salary,
      email,
      updated_at: new Date().toISOString()
    });
  });
});

// DELETE /employees/:id - Remove an employee
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM employees WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      console.error(`❌ DELETE /employees/${id} error:`, err.message);
      return res.status(400).json({ error: err.message, code: 'DB_ERROR' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Employee not found', code: 'NOT_FOUND' });
    }

    console.log(`✅ Employee with ID ${id} deleted`);
    res.json({
      message: 'Employee deleted successfully',
      deletedID: parseInt(id)
    });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    code: 'NOT_FOUND',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({
    error: err.message,
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  Employee Management Backend API                      ║');
  console.log('║  🚀 Server running on http://localhost:' + PORT + '                ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('📋 Available endpoints:');
  console.log('   GET    /employees           - Get all employees');
  console.log('   GET    /employees/:id       - Get employee by ID');
  console.log('   POST   /employees           - Create new employee');
  console.log('   PUT    /employees/:id       - Update employee');
  console.log('   DELETE /employees/:id       - Delete employee');
  console.log('   GET    /health              - Health check');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM received, closing database...');
  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err.message);
      process.exit(1);
    }
    console.log('✅ Database closed');
    process.exit(0);
  });
});
