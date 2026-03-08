import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
    name: 'departmentFilter',
    standalone: true,
    pure: false
})
export class DepartmentFilterPipe implements PipeTransform {
    transform(employees: Employee[] | null, filter: string): Employee[] {
        if (!employees) return [];
        if (!filter || !filter.trim()) return employees;

        const searchTerm = filter.toLowerCase().trim();
        return employees.filter(emp =>
            emp.department.toLowerCase().includes(searchTerm)
        );
    }
}
