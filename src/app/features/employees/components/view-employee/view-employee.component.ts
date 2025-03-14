import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewEmployeeModule } from '../../modules/view-employee.module';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeResponse } from '../../interfaces/IEmployee';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [ViewEmployeeModule, DatePipe],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewEmployeeComponent {

  private employeeService = inject(EmployeeService);
  private dialogRef = inject(MatDialogRef<ViewEmployeeComponent>);
  private dialogData = inject(MAT_DIALOG_DATA);

  employee: Signal<EmployeeResponse | null>;

  constructor(){
    this.employee = this.employeeService.selectedEmployee;
    this.employeeService.getEmployeeById(this.dialogData.id);
  }

  closeDialog(): void{
    this.dialogRef.close();
  }
}