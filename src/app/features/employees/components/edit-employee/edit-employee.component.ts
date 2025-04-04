import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEmployeeModule } from '../../modules/edit-employee.module';
import { EmployeeService } from '../../services/employee.service';
import { ReferenceValueService } from '../../../../core/services/reference-value/reference-value.service';
import { EmployeeRequest, EmployeeResponse } from '../../interfaces/IEmployee';
import { DepartmentResponse } from '../../../../core/interfaces/reference/IDepartment';
import { PostTitleResponse } from '../../../../core/interfaces/reference/IPostTitles';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [EditEmployeeModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditEmployeeComponent {
  private employeeService = inject(EmployeeService);
  private referenceService = inject(ReferenceValueService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private datePipe = inject(DatePipe);
  private toastr = inject(ToastrService);
  
  employee: Signal<EmployeeResponse | null>;
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

  employeeId: number = -1;
  readonly maxDate = new Date();

  constructor(){
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.departments = this.referenceService.departments;
    this.postTitles = this.referenceService.postTitles;
    this.employee = this.employeeService.selectedEmployee;

    this.referenceService.getDepartments();
    this.referenceService.getPostTitles();

    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId);
    }

    this.loadEmployee();
  }

  private loadEmployee() {
    if (!this.employeeId) {
      this.router.navigate(['/employees']);
      return;
    }

    effect(() => {
      const selectedEmployee = this.employeeService.selectedEmployee();
      if (selectedEmployee) {
        this.employeeForm.set({
          firstName: selectedEmployee.firstName,
          otherName: selectedEmployee.otherName,
          lastName: selectedEmployee.lastName,
          dateOfBirth: selectedEmployee.dateOfBirth,
          email: selectedEmployee.email,
          dateJoined: selectedEmployee.dateJoined,
          departmentId: this.departments().find(x => x.name == this.employee()!.department)!.id,
          postTitleId: this.postTitles().find(x => x.name == this.employee()!.postTitle)!.id,
        });
      }
    },
    {
      allowSignalWrites: true,
    });
  }

  updateEmployee() {
    if (!this.isFormValid()) {
      this.showValidationError();
      return;
    }

    this.employeeForm.update((form) => ({
      ...form,
      dateOfBirth: this.datePipe.transform(form.dateOfBirth, 'yyyy-MM-dd') ?? '',
      dateJoined: this.datePipe.transform(form.dateJoined, 'yyyy-MM-dd') ?? '',
    }));

    this.employeeService.updateEmployee(this.employeeId, this.employeeForm()).subscribe({
      next: employee => {
        this.toastr.success(
          `Employee: ${employee.firstName} ${employee.lastName} successfully updated`,
          'Success'
        );
      }
    });
  }

  close(){
    this.router.navigate(['/employees']);
  }

  private isFormValid = computed(() => {
    const form = this.employeeForm();
    return (
      form.firstName.trim() !== '' &&
      form.otherName?.trim() !== '' &&
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
