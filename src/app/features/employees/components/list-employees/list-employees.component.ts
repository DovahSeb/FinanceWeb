import { AfterViewInit, Component, effect, inject, Signal, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { FilterComponent } from '../../../../shared/components/filter/filter.component';
import { ListEmployeesModules } from '../../modules/list-employees.module';
import { EmployeeRequest, EmployeeResponse } from '../../interfaces/IEmployee';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [ListEmployeesModules, RouterLink, FilterComponent],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss',
  providers: [DatePipe]
})
export class ListEmployeesComponent implements AfterViewInit {
  employeeService = inject(EmployeeService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'department', 'postTitle', 'actions'];
  dataSource: MatTableDataSource<EmployeeResponse> = new MatTableDataSource<EmployeeResponse>();
  employees: Signal<EmployeeResponse[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.employees = this.employeeService.employees;

    this.dataSource.filterPredicate = (data: EmployeeResponse, filter: string) => {
      const fullName = `${data.firstName} ${data.lastName}`.toLowerCase();
      return fullName.includes(filter);
    };

    effect(() => {
      this.dataSource.data = this.employees();
    });
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  addEmployee(): void {
    this.dialog.open(AddEmployeeComponent, {
      height: 'auto',
      width: '600px',
    });
  }

}
