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
            <mat-error *ngIf="employeeForm.get('name')?.hasError('required')">Name is required.</mat-error>
            <mat-error *ngIf="employeeForm.get('name')?.hasError('minlength')">Name must be at least 2 characters.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
             <!-- Note: Added generic email to schema for Task 5 requirements, fallback if missing -->
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" placeholder="Valid email address">
            <mat-error *ngIf="employeeForm.get('email')?.hasError('required')">Email is required.</mat-error>
            <mat-error *ngIf="employeeForm.get('email')?.hasError('email')">Please enter a valid email address.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Role</mat-label>
            <input matInput formControlName="role" placeholder="Select role">
            <mat-error *ngIf="employeeForm.get('role')?.hasError('required')">Role is required.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Department</mat-label>
            <input matInput formControlName="department" placeholder="Department">
            <mat-error *ngIf="employeeForm.get('department')?.hasError('required')">Department is required.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Salary</mat-label>
            <input matInput type="number" formControlName="salary" placeholder="Yearly salary">
            <mat-error *ngIf="employeeForm.get('salary')?.hasError('required')">Salary is required.</mat-error>
            <mat-error *ngIf="employeeForm.get('salary')?.hasError('min')">Salary must be a positive number.</mat-error>
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
            salary: [0, [Validators.required, Validators.min(1)]]
        });
    }

    ngOnChanges() {
        if (this.employee) {
            this.employeeForm.patchValue({
                name: this.employee.name,
                email: (this.employee as any).email || '',
                role: this.employee.role,
                department: this.employee.department,
                salary: this.employee.salary
            });
        } else {
            this.employeeForm.reset({ salary: 0 });
        }
    }

    onSubmit() {
        if (this.employeeForm.valid) {
            const formValue = this.employeeForm.value;
            const submittedEmployee: Employee = this.employee ?
                { ...this.employee, ...formValue } :
                { id: 0, ...formValue };

            this.formSubmit.emit(submittedEmployee);
            this.employeeForm.reset({ salary: 0 });
        }
    }

    onCancel() {
        this.employeeForm.reset({ salary: 0 });
        this.formCancel.emit();
    }
}
