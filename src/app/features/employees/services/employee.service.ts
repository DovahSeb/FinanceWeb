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

  constructor() { }

  getEmployees(): void {
    this.http
      .get<EmployeeResponse[]>(`${this.apiUrl}/GetEmployees`)
      .pipe(tap(employees => this._employees.set(employees)))
      .subscribe()
  }
}
