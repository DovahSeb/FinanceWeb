import { Component, inject, Signal } from '@angular/core';
import { ListEmployeesModules } from '../../modules/list-employees.module';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeResponse } from '../../interfaces/IEmployee';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [ListEmployeesModules, DatePipe],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})
export class ListEmployeesComponent {
  private employeeservice = inject(EmployeeService);

  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'department', 'postTitle', 'actions'];
  employees: Signal<EmployeeResponse[]>

  constructor() {
    this.employees = this.employeeservice.employees;
    this.employeeservice.getEmployees();
  }
}
