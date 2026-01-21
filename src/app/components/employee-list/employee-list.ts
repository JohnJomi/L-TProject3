import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';

/**
 * EmployeeList Component
 * Displays a list of employees with their details
 */
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  // Mock employee data
  employees: Employee[] = [
    { id: 1, name: 'John', role: 'Developer', department: 'IT', salary: 50000 },
    { id: 2, name: 'Alice', role: 'Designer', department: 'UI/UX', salary: 45000 },
    { id: 3, name: 'Mark', role: 'Manager', department: 'HR', salary: 60000 },
  ];
}
