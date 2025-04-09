import { Component } from '@angular/core';
import { HomeModules } from '../../modules/home.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeModules],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
