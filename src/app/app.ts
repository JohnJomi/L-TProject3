import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { EmployeeList } from './components/employee-list/employee-list';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, EmployeeList],
  templateUrl: './app.html',
})
export class App {}
