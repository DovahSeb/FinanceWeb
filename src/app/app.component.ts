import { Component } from '@angular/core';
import { MenuComponent } from './features/main/components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FinanceWeb';
}
