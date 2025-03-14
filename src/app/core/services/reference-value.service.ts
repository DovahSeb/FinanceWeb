import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DepartmentResponse } from '../interfaces/reference/IDepartment';

@Injectable({
  providedIn: 'root'
})
export class ReferenceValueService {

  private readonly apiUrl = `${environment.baseUrl}/references`;

  private readonly _departments: WritableSignal<DepartmentResponse[]> = signal([]);
  readonly departments: Signal<DepartmentResponse[]> = this._departments.asReadonly();

  constructor(private http: HttpClient){}

  getDepartments(): void {
    this.http
      .get<DepartmentResponse[]>(`${this.apiUrl}/GetDepartments`)
      .pipe(tap(departments => this._departments.set(departments)))
      .subscribe()
  };
  
}