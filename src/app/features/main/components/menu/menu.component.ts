import { Component, inject, Signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { SidenavComponent } from '../../../../core/layout/components/sidenav/sidenav.component';
import { ConfirmationDialogData, ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private authService = inject(AuthService);
  private dialog = inject(MatDialog)

  userName: Signal<string>;

  constructor() {
    this.userName = this.authService.userName;
  }

  ngOnInit() {
    this.authService.getUserName();
  }

  logout(): void {
    const dialogData: ConfirmationDialogData = {
      dialogTitle: 'Logout Confirmation',
      message: 'Are you sure you want to logout?',
      confirmButtonLabel: 'Yes, Logout',
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.authService.logout();
      }
    })
  }
}
