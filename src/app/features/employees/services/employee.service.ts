import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EmployeeResponse } from '../interfaces/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.baseUrl}/employees`

  private readonly _employees: WritableSignal<EmployeeResponse[]> = signal([]);
  readonly employees: Signal<EmployeeResponse[]> = this._employees.asReadonly();

  private readonly _selectedEmployee: WritableSignal<EmployeeResponse | null> = signal(null);
  readonly selectedEmployee: Signal<EmployeeResponse | null> = this._selectedEmployee.asReadonly();

  constructor() { }

  getEmployees(): void {
    this.http
      .get<EmployeeResponse[]>(`${this.apiUrl}/GetEmployees`)
      .pipe(tap(employees => this._employees.set(employees)))
      .subscribe()
  }

  getEmployeeById(id: string): void {
    this.http
      .get<EmployeeResponse>(`${this.apiUrl}/GetEmployeeById/${id}`)
      .pipe(tap(employee => this._selectedEmployee.set(employee)))
      .subscribe()
  };
}
