import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeSearchPipe } from '../../pipes/employee-search.pipe';
import { HighlightSalaryDirective } from '../../directives/highlight-salary.directive';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeDetail } from '../employee-detail/employee-detail';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EmployeeSearchPipe,
    HighlightSalaryDirective,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    EmployeeFormComponent
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit, OnDestroy {
  // Observable stream consumed by async pipe in template
  employees$!: Observable<Employee[]>;
  private subscription: Subscription = new Subscription();

  searchTerm: string = '';
  showAddForm = false;
  editingEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Single observable stream — template uses async pipe
    this.employees$ = this.employeeService.getEmployees();

    // Only subscribe for form toggle state (not data)
    this.subscription.add(
      this.employeeService.addEmployee$.subscribe((show) => {
        this.showAddForm = show;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleAddForm() {
    this.employeeService.toggleAddForm();
    if (!this.showAddForm) {
      this.editingEmployee = null;
    }
  }

  onFormSubmit(employee: Employee) {
    if (this.editingEmployee) {
      // For edit: subscribe to update operation and close form when done
      this.employeeService.updateEmployee(employee).subscribe({
        next: () => {
          this.editingEmployee = null;
          this.showAddForm = false;
        },
        error: (error) => {
          console.error('Error updating employee:', error);
        }
      });
    } else {
      // For add: subscribe to add operation and close form when done
      this.employeeService.addEmployee(employee).subscribe({
        next: () => {
          // Form was successfully added, close the form
          this.employeeService.resetAddForm();
        },
        error: (error) => {
          console.error('Error adding employee:', error);
        }
      });
    }
  }

  onFormCancel() {
    if (this.editingEmployee) {
      this.editingEmployee = null;
    } else {
      this.employeeService.resetAddForm();
    }
  }

  startEdit(employee: Employee) {
    this.editingEmployee = { ...employee };
    this.showAddForm = false;
  }

  viewEmployee(employee: Employee) {
    this.dialog.open(EmployeeDetail, {
      data: employee,
      width: '500px',
      maxWidth: '90vw',
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: 'employee-detail-dialog'
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe();
    }
  }
}

