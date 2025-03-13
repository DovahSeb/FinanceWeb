import { Component, ViewChild, AfterViewInit, OnDestroy, inject, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay, Subject, takeUntil, filter } from 'rxjs';
import { SideNavModules } from '../../modules/sidenav.module';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [SideNavModules, HeaderComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements AfterViewInit, OnDestroy {

  @Output() logoutEvent = new EventEmitter<void>();

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  private destroy$ = new Subject<void>();
  private observer = inject(BreakpointObserver);
  private router = inject(Router);

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(
        delay(1),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
