import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

/**
 * Navbar Component
 * Displays the application header with action buttons
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public employeeService: EmployeeService) {}

  toggleAddForm() {
    this.employeeService.toggleAddForm();
  }
}

