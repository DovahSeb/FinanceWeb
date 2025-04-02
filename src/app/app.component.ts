import { Component, inject } from '@angular/core';
import { LandingComponent } from './features/main/components/landing/landing.component';
import { MenuComponent } from './features/main/components/menu/menu.component';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FinanceWeb';

  public authService = inject(AuthService);

  ngOnInit(){
    this.authService.loadAuthState();
    this.authService.loadUserName();
  }
}
