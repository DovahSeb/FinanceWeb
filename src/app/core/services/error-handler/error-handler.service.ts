import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from '../../interfaces/error-handler/IErrorHandler'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private toastr = inject(ToastrService);

  handleHttpError(status: number, error: any): void {
    const errorMessage = this.extractHttpErrorMessage(status, error);
    this.toastr.error(errorMessage, 'Error');
  }

  private extractHttpErrorMessage(status: number, error: ErrorResponse): string {
    switch (status) {
      case 400:
        return error?.title? `${error.title}` : 'Bad request.';
      case 401:
        return 'Unauthorized access.';
      case 404:
        return error?.title? `${error.title}` : 'Resource not found.';
      case 500:
        return 'Internal server error.';
      default:
        return `Unexpected error: ${error?.title || 'Unknown status'}`;
    }
  }
}
