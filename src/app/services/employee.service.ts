import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private apiUrl = '/assets/employees.json';

  // Form visibility state
  private addEmployeeSubject = new BehaviorSubject<boolean>(false);
  addEmployee$ = this.addEmployeeSubject.asObservable();

  toggleAddForm() {
    this.addEmployeeSubject.next(!this.addEmployeeSubject.value);
  }

  resetAddForm() {
    this.addEmployeeSubject.next(false);
  }

  // Employee state — BehaviorSubject as single source of truth
  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);
  employees$ = this.employeesSubject.asObservable();

  private dataLoaded = false;

  // Fetch initial data via HTTP GET, always return the observable stream
  getEmployees(): Observable<Employee[]> {
    if (!this.dataLoaded) {
      this.dataLoaded = true;
      this.http.get<Employee[]>(this.apiUrl).pipe(
        tap((data) => {
          this.employees = data;
          this.employeesSubject.next(this.employees);
        }),
        catchError((error) => {
          console.error('API Error:', error);
          this.dataLoaded = false;
          return of([]);
        })
      ).subscribe();
    }
    // Always return the BehaviorSubject stream
    return this.employees$;
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    const employee = this.employees.find(e => e.id === id);
    return of(employee ? { ...employee } : undefined);
  }

  // Simulated POST
  addEmployee(employee: Employee): Observable<Employee> {
    const maxId = this.employees.length ? Math.max(...this.employees.map(emp => emp.id)) : 0;
    const newEmployee = { ...employee, id: maxId + 1 };

    return of(newEmployee).pipe(
      tap((emp) => {
        this.employees = [...this.employees, emp];
        this.employeesSubject.next(this.employees);
      }),
      catchError(this.handleError)
    );
  }

  // Simulated PUT
  updateEmployee(employee: Employee): Observable<Employee> {
    return of(employee).pipe(
      tap((emp) => {
        const index = this.employees.findIndex(e => e.id === emp.id);
        if (index !== -1) {
          this.employees = [
            ...this.employees.slice(0, index),
            { ...emp },
            ...this.employees.slice(index + 1)
          ];
          this.employeesSubject.next(this.employees);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Simulated DELETE
  deleteEmployee(id: number): Observable<boolean> {
    return of(true).pipe(
      tap(() => {
        this.employees = this.employees.filter(e => e.id !== id);
        this.employeesSubject.next(this.employees);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('An error occurred during API execution.'));
  }
}
