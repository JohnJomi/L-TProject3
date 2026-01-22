import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [
    { id: 1, name: 'John', role: 'Developer', department: 'IT', salary: 50000 },
    { id: 2, name: 'Alice', role: 'Designer', department: 'UI/UX', salary: 45000 },
    { id: 3, name: 'Mark', role: 'Manager', department: 'HR', salary: 60000 },
  ];

  showAddForm = false;
  editingId: number | null = null;
  nextId = 4;

  formData = {
    name: '',
    role: '',
    department: '',
    salary: 0,
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.addEmployee$.subscribe((show) => {
      this.showAddForm = show;
    });
  }

  toggleAddForm() {
    this.employeeService.toggleAddForm();
  }

  addEmployee() {
    if (this.formData.name && this.formData.role && this.formData.department && this.formData.salary > 0) {
      const newEmployee: Employee = {
        id: this.nextId++,
        ...this.formData,
      };
      this.employees.push(newEmployee);
      this.resetForm();
      this.employeeService.resetAddForm();
    }
  }

  startEdit(employee: Employee) {
    this.editingId = employee.id;
    this.formData = {
      name: employee.name,
      role: employee.role,
      department: employee.department,
      salary: employee.salary,
    };
  }

  saveEdit(id: number) {
    const employee = this.employees.find(e => e.id === id);
    if (employee && this.formData.name && this.formData.role && this.formData.department && this.formData.salary > 0) {
      employee.name = this.formData.name;
      employee.role = this.formData.role;
      employee.department = this.formData.department;
      employee.salary = this.formData.salary;
      this.editingId = null;
      this.resetForm();
    }
  }

  cancelEdit() {
    this.editingId = null;
    this.resetForm();
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees = this.employees.filter(e => e.id !== id);
    }
  }

  private resetForm() {
    this.formData = {
      name: '',
      role: '',
      department: '',
      salary: 0,
    };
  }
}

