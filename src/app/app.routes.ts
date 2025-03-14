import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'employees',
        loadComponent: () => import('./features/employees/components/list-employees/list-employees.component').then(c => c.ListEmployeesComponent)
    },
    {
        path: 'employee/:id',
        loadComponent: () => import('./features/employees/components/edit-employee/edit-employee.component').then(c => c.EditEmployeeComponent)
    },
];
