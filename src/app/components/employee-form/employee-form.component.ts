import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Employee } from '../../models/employee.model';

@Component({
    selector: 'app-employee-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    template: `
    <mat-card class="form-card">
      <mat-card-header>
        <mat-card-title>{{ employee ? 'Edit' : 'Add New' }} Employee</mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()" class="employee-form" novalidate>
          
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter full name">
            <mat-error *ngIf="employeeForm.get('name')?.hasError('required') && employeeForm.get('name')?.touched">Name is required.</mat-error>
            <mat-error *ngIf="employeeForm.get('name')?.hasError('minlength') && employeeForm.get('name')?.touched">Name must be at least 2 characters.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
             <!-- Note: Added generic email to schema for Task 5 requirements, fallback if missing -->
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" placeholder="Valid email address">
            <mat-error *ngIf="employeeForm.get('email')?.hasError('required') && employeeForm.get('email')?.touched">Email is required.</mat-error>
            <mat-error *ngIf="employeeForm.get('email')?.hasError('email') && employeeForm.get('email')?.touched">Please enter a valid email address.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Role</mat-label>
            <input matInput formControlName="role" placeholder="Select role">
            <mat-error *ngIf="employeeForm.get('role')?.hasError('required') && employeeForm.get('role')?.touched">Role is required.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Department</mat-label>
            <input matInput formControlName="department" placeholder="Department">
            <mat-error *ngIf="employeeForm.get('department')?.hasError('required') && employeeForm.get('department')?.touched">Department is required.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Salary</mat-label>
            <input matInput type="number" formControlName="salary" placeholder="Yearly salary">
            <mat-error *ngIf="employeeForm.get('salary')?.hasError('required') && employeeForm.get('salary')?.touched">Salary is required.</mat-error>
            <mat-error *ngIf="employeeForm.get('salary')?.hasError('min') && employeeForm.get('salary')?.touched">Salary must be a positive number.</mat-error>
          </mat-form-field>

          <div class="form-actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="employeeForm.invalid">
              {{ employee ? 'Save Changes' : 'Create' }}
            </button>
            <button mat-button type="button" (click)="onCancel()">Cancel</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
    styles: [`
    .form-card {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .employee-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 15px;
    }
    .full-width {
      width: 100%;
    }
    .form-actions {
      display: flex;
      gap: 15px;
      margin-top: 10px;
    }
  `]
})
export class EmployeeFormComponent implements OnChanges {
    @Input() employee: Employee | null = null;
    @Output() formSubmit = new EventEmitter<Employee>();
    @Output() formCancel = new EventEmitter<void>();

    employeeForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.employeeForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            role: ['', [Validators.required]],
            department: ['', [Validators.required]],
            salary: [null, [Validators.required, Validators.min(0)]]
        });
    }

    ngOnChanges() {
        if (this.employee) {
            // Editing mode - populate form with employee data
            this.employeeForm.patchValue({
                name: this.employee.name,
                email: (this.employee as any).email || '',
                role: this.employee.role,
                department: this.employee.department,
                salary: this.employee.salary
            });
            // Mark all fields as untouched in edit mode so no errors show initially
            Object.keys(this.employeeForm.controls).forEach(key => {
                this.employeeForm.get(key)?.markAsUntouched();
            });
        } else {
            // Add mode - reset form to clean state
            this.employeeForm.reset({}, { emitEvent: false });
            // Mark all fields as untouched so errors don't show on initial load
            Object.keys(this.employeeForm.controls).forEach(key => {
                this.employeeForm.get(key)?.markAsUntouched();
            });
        }
    }

    onSubmit() {
        // If form is invalid, show all errors and prevent submission
        if (this.employeeForm.invalid) {
            this.employeeForm.markAllAsTouched();
            return;
        }

        // Extract form value
        const formValue = this.employeeForm.value;

        // Create employee object for submission
        const submittedEmployee: Employee = this.employee ?
            { ...this.employee, ...formValue } :
            { id: 0, ...formValue };

        // Emit the employee to parent component for service handling
        this.formSubmit.emit(submittedEmployee);

        // Reset form to clean state only after successful emit
        this.employeeForm.reset({}, { emitEvent: false });
        Object.keys(this.employeeForm.controls).forEach(key => {
            this.employeeForm.get(key)?.markAsUntouched();
        });
    }

    onCancel() {
        // Reset form to clean state
        this.employeeForm.reset({}, { emitEvent: false });

        // Mark all fields as untouched to hide any validation errors
        Object.keys(this.employeeForm.controls).forEach(key => {
            this.employeeForm.get(key)?.markAsUntouched();
        });

        // Emit cancel event to parent
        this.formCancel.emit();
    }
}
