import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DepartmentResponse } from '../interfaces/reference/IDepartment';
import { PostTitleResponse } from '../interfaces/reference/IPostTitles';

@Injectable({
  providedIn: 'root'
})
export class ReferenceValueService {

  private readonly apiUrl = `${environment.baseUrl}/references`;

  private readonly _departments: WritableSignal<DepartmentResponse[]> = signal([]);
  readonly departments: Signal<DepartmentResponse[]> = this._departments.asReadonly();

  private readonly _postTitles: WritableSignal<PostTitleResponse[]> = signal([]);
  readonly postTitles: Signal<PostTitleResponse[]> = this._postTitles.asReadonly();

  constructor(private http: HttpClient){}

  getDepartments(): void {
    this.http
      .get<DepartmentResponse[]>(`${this.apiUrl}/GetDepartments`)
      .pipe(tap(departments => this._departments.set(departments)))
      .subscribe()
  };
  
  getPostTitles(): void {
    this.http
      .get<PostTitleResponse[]>(`${this.apiUrl}/GetPostTitles`)
      .pipe(tap(postTitles => this._postTitles.set(postTitles)))
      .subscribe()
  }
}