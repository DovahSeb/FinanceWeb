import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EmployeeRequest, EmployeeResponse } from '../interfaces/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.baseUrl}/employees`;

  private readonly _employees: WritableSignal<EmployeeResponse[]> = signal([]);
  readonly employees: Signal<EmployeeResponse[]> = this._employees.asReadonly();

  private readonly _selectedEmployee: WritableSignal<EmployeeResponse | null> = signal(null);
  readonly selectedEmployee: Signal<EmployeeResponse | null> = this._selectedEmployee.asReadonly();

  private readonly _loadingEmployees = signal(false);
  readonly loadingEmployees = this._loadingEmployees.asReadonly();

  constructor() { }

  getEmployees() {
    this._loadingEmployees.set(true);
    return this.http
    .get<EmployeeResponse[]>(`${this.apiUrl}/GetEmployees`)
    .pipe(
      tap(employees => {
        this._employees.set(employees);
        this._loadingEmployees.set(false);
      }),
    );
  }

  getEmployeeById(id: number) : Observable<EmployeeResponse> {
    return this.http
    .get<EmployeeResponse>(`${this.apiUrl}/GetEmployeeById/${id}`)
    .pipe(
      tap(employee => this._selectedEmployee.set(employee))
    );
  }

  addEmployee(newEmployee: EmployeeRequest) : Observable<EmployeeResponse> {
    return this.http
    .post<EmployeeResponse>(`${this.apiUrl}/CreateEmployee`, newEmployee)
    .pipe(
      tap(addedEmployee => this._employees.update(currentEmployees => [...currentEmployees, addedEmployee]))
    );
  }

  updateEmployee(id: number, updatedEmployee: EmployeeRequest): Observable<EmployeeResponse> {
    return this.http
    .put<EmployeeResponse>(`${this.apiUrl}/UpdateEmployee/${id}`, updatedEmployee)
    .pipe(
      tap(employee => this._employees.update(currentEmployees => currentEmployees.map(e => e.id === employee.id ? employee : e))),
    );
  }
}
