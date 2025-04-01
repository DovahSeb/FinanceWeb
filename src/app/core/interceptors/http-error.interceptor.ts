import { HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { ErrorResponse } from '../interfaces/error-handler/IErrorHandler';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandlerService = inject(ErrorHandlerService);

  return next(req).pipe(
    catchError((error: ErrorResponse) => {
      if (error instanceof HttpErrorResponse)
        errorHandlerService.handleHttpError(error.status, error.error);
    
      return throwError(() => new Error('An error occurred.'));
    })
  );
};
