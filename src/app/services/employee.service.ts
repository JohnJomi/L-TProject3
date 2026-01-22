import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Employee Service
 * Manages state for employee operations
 */
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private addEmployeeSubject = new BehaviorSubject<boolean>(false);
  addEmployee$ = this.addEmployeeSubject.asObservable();

  toggleAddForm() {
    this.addEmployeeSubject.next(!this.addEmployeeSubject.value);
  }

  resetAddForm() {
    this.addEmployeeSubject.next(false);
  }
}
