import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, FooterComponent],
  template: `
    @if (!isAdminRoute()) {
      <app-nav />
    }
    <router-outlet />
    @if (!isAdminRoute()) {
      <app-footer />
    }
  `,
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
