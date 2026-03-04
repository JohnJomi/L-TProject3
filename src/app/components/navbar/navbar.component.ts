import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
    template: `
    <mat-toolbar color="primary" class="navbar">
      <span>Employee Management Dashboard</span>
      <span class="spacer"></span>
      <button mat-icon-button aria-label="Menu dropdown">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
  `,
    styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .navbar {
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
      position: relative;
      z-index: 10;
    }
  `]
})
export class NavbarComponent { }
