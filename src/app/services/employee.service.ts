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
  // Backend API endpoint
  private apiUrl = 'http://localhost:3000/employees';

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
    return this.http.get<Employee>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching employee ${id}:`, error);
        return of(undefined);
      })
    );
  }

  // Real POST to backend
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      tap((newEmployee) => {
        this.employees = [...this.employees, newEmployee];
        this.employeesSubject.next(this.employees);
      }),
      catchError(this.handleError)
    );
  }

  // Real PUT to backend
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee).pipe(
      tap((updatedEmployee) => {
        const index = this.employees.findIndex(e => e.id === employee.id);
        if (index !== -1) {
          this.employees = [
            ...this.employees.slice(0, index),
            { ...updatedEmployee },
            ...this.employees.slice(index + 1)
          ];
          this.employeesSubject.next(this.employees);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Real DELETE to backend
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
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
