import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogModules } from '../../modules/confirmation-dialog.module';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ConfirmationDialogModules],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  private _dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  public _data: ConfirmationDialogData = inject(MAT_DIALOG_DATA);

  onConfirm(): void {
    this._dialogRef.close(true);
  }

  onCancel(): void {
    this._dialogRef.close(false);
  }
}

export interface ConfirmationDialogData {
  dialogTitle: string;
  message: string;
  confirmButtonLabel: string;
}