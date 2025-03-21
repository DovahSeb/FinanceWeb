import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { ReferenceValueService } from '../../../../core/services/reference-value/reference-value.service';
import { AddEmployeesModule } from '../../modules/add-employee.module';
import { EmployeeRequest } from '../../interfaces/IEmployee';
import { DepartmentResponse } from '../../../../core/interfaces/reference/IDepartment';
import { PostTitleResponse } from '../../../../core/interfaces/reference/IPostTitles';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [AddEmployeesModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployeeComponent {
  private employeeService = inject(EmployeeService);
  private referenceService = inject(ReferenceValueService);
  private dialogRef = inject(MatDialogRef<AddEmployeeComponent>);
  private toastr = inject(ToastrService);
  private datePipe = inject(DatePipe);

  departments: Signal<DepartmentResponse[]>;
  postTitles: Signal<PostTitleResponse[]>;
  employeeForm = signal<EmployeeRequest>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    dateJoined: '',
    departmentId: -1,
    postTitleId: -1,
  });

  readonly maxDate = new Date();

  constructor() {
    this.departments = this.referenceService.departments;
    this.postTitles = this.referenceService.postTitles;
  }

  ngOnInit() {
    this.referenceService.getDepartments();
    this.referenceService.getPostTitles();
  }

  saveNewEmployee() {
    if (!this.isFormValid()) {
      this.showValidationError();
      return;
    }

    this.employeeForm.update((form) => ({
      ...form,
      dateOfBirth: this.datePipe.transform(form.dateOfBirth, 'yyyy-MM-dd') ?? '',
      dateJoined: this.datePipe.transform(form.dateJoined, 'yyyy-MM-dd') ?? '',
    }));

    this.employeeService.addEmployee(this.employeeForm());
    this.dialogRef.close(this.employeeForm());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private isFormValid = computed(() => {
    const form = this.employeeForm();
    return (
      form.firstName.trim() !== '' &&
      form.lastName.trim() !== '' &&
      form.dateOfBirth !== '' &&
      form.email.trim() !== '' &&
      form.dateJoined !== '' &&
      form.departmentId > 0 &&
      form.postTitleId > 0
    );
  });

  private showValidationError(): void {
    this.toastr.error('Please fill in the required fields', 'Validation Error');
  }
}
