import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'employees',
        loadComponent: () => import('./features/employees/components/list-employees/list-employees.component').then(c => c.ListEmployeesComponent)
    },
];
