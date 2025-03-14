import { Component, inject, Signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ListEmployeesModules } from '../../modules/list-employees.module';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeResponse } from '../../interfaces/IEmployee';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [ListEmployeesModules, DatePipe],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})
export class ListEmployeesComponent {
  private employeeservice = inject(EmployeeService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'department', 'postTitle', 'actions'];
  employees: Signal<EmployeeResponse[]>

  constructor() {
    this.employees = this.employeeservice.employees;
    this.employeeservice.getEmployees();
  }

  viewEmployee(id: string): void {
    this.dialog.open(ViewEmployeeComponent, {
      height: 'auto',
      width: '600px',
      data: {
        'id': id
      }
    });
  }
}
