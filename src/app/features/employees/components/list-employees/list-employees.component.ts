import { AfterViewInit, Component, effect, inject, Signal, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ListEmployeesModules } from '../../modules/list-employees.module';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeResponse } from '../../interfaces/IEmployee';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [ListEmployeesModules, RouterLink],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss',
  providers: [DatePipe]
})
export class ListEmployeesComponent implements AfterViewInit {
  private employeeservice = inject(EmployeeService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'department', 'postTitle', 'actions'];
  dataSource: MatTableDataSource<EmployeeResponse> = new MatTableDataSource<EmployeeResponse>();
  employees: Signal<EmployeeResponse[]>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.employees = this.employeeservice.employees;
    effect(() => {
      this.dataSource.data = this.employees();
    });
  }

  ngOnInit() {
    this.employeeservice.getEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewEmployee(id: number): void {
    this.dialog.open(ViewEmployeeComponent, {
      height: 'auto',
      width: '600px',
      data: {
        'id': id
      }
    });
  }

}
