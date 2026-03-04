import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

/**
 * Employee Service
 * Manages state for employee operations
 */
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private apiUrl = '/assets/employees.json'; // Simulated endpoints

  private addEmployeeSubject = new BehaviorSubject<boolean>(false);
  addEmployee$ = this.addEmployeeSubject.asObservable();

  toggleAddForm() {
    this.addEmployeeSubject.next(!this.addEmployeeSubject.value);
  }

  resetAddForm() {
    this.addEmployeeSubject.next(false);
  }

  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);
  employees$ = this.employeesSubject.asObservable(); // Public exposed stream

  // Fetch initial data via Http GET
  getEmployees(): Observable<Employee[]> {
    if (this.employees.length === 0) {
      return this.http.get<Employee[]>(this.apiUrl).pipe(
        tap((data) => {
          this.employees = data;
          this.employeesSubject.next(this.employees);
        }),
        catchError(this.handleError)
      );
    }
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

    // In a real app: return this.http.post<Employee>(this.apiUrl, employee).pipe(...)
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
    // In a real app: return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee).pipe(...)
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
    // In a real app: return this.http.delete<boolean>(`${this.apiUrl}/${id}`).pipe(...)
    return of(true).pipe(
      tap(() => {
        this.employees = this.employees.filter(e => e.id !== id);
        this.employeesSubject.next(this.employees);
      }),
      catchError(this.handleError)
    );
  }

  // Global Error Handler for the Service
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('An error occurred during API execution.'));
  }
}
