import { Component, Input } from '@angular/core';
import { HeaderModules } from '../../modules/header.module';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderModules],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  @Input() sidenav!: MatSidenav;
}