import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('./features/main/components/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'employees',
        loadComponent: () => import('./features/employees/components/list-employees/list-employees.component').then(c => c.ListEmployeesComponent)
    },
    {
        path: 'employee/:id',
        loadComponent: () => import('./features/employees/components/edit-employee/edit-employee.component').then(c => c.EditEmployeeComponent)
    },
];
