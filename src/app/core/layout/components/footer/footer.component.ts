import { Component } from '@angular/core';
import { FooterModules } from '../../modules/footer.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FooterModules],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
