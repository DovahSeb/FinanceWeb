import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../interfaces/auth/IAuth';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.baseUrl}/auth`;
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);

  private _isAuthenticated = signal(false);
  readonly isAuthenticated: Signal<boolean> = computed(() => this._isAuthenticated());

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  login(login: LoginRequest) {
    const url = `${this.apiUrl}/login?useCookies=true`;
    const body = login;

    return this.http.post(url, body, this.httpOptions).pipe(
      tap(() => {
        this._isAuthenticated.set(true);
        this.saveAuthState();
      }),
      catchError(() => {
        return throwError(() => new Error("Login Error. Please try again later"));
      })
    ).subscribe(() => {
      this.toastr.success("Login Successful", "Success");
    });
  }

  logout() {
    const body = {};
    return this.http.post(`${this.apiUrl}/logout`, body, this.httpOptions).pipe(
      tap(() => {
        this._isAuthenticated.set(false);
        this.clearAuthState();
      }),
      catchError(() => {
        return throwError(() => new Error("Logout Error. Please try again later"));
      })
    ).subscribe(() => {
      this.toastr.success("Logout Successful", "Success");
    });
  }

  saveAuthState() {
    localStorage.setItem('isAuthenticated', JSON.stringify(this._isAuthenticated()));
  }

  loadAuthState() {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
    this._isAuthenticated.set(isAuthenticated);
  }

  clearAuthState() {
    localStorage.removeItem('isAuthenticated');
  }
}
