import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
    name: 'departmentFilter',
    standalone: true
})
export class DepartmentFilterPipe implements PipeTransform {
    transform(employees: Employee[] | null, filter: string): Employee[] {
        if (!employees) return [];
        if (!filter) return employees;

        return employees.filter(emp => emp.department.toLowerCase() === filter.toLowerCase());
    }
}
