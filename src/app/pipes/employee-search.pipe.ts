import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
    name: 'employeeSearch',
    standalone: true,
    pure: false
})
export class EmployeeSearchPipe implements PipeTransform {
    transform(employees: Employee[] | null, searchTerm: string): Employee[] {
        if (!employees) return [];
        if (!searchTerm || !searchTerm.trim()) return employees;

        const term = searchTerm.toLowerCase().trim();

        return employees.filter(emp =>
            emp.name.toLowerCase().includes(term)
        );
    }
}
