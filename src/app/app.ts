import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { EmployeeList } from './components/employee-list/employee-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, EmployeeList],
  templateUrl: './app.html',
})
export class App { }
