import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../services/admin-auth.service';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-shell.component.html',
  styleUrl: './admin-shell.component.scss',
})
export class AdminShellComponent {
  auth = inject(AdminAuthService);
  private router = inject(Router);
  sidebarOpen = signal(false);

  navItems: NavItem[] = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'grid' },
    { path: '/admin/users',     label: 'Users',     icon: 'users' },
    { path: '/admin/teams',     label: 'Teams',     icon: 'shield' },
    { path: '/admin/payments',  label: 'Payments',  icon: 'card' },
    { path: '/admin/signups',   label: 'Sign-ups',  icon: 'chart' },
  ];

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
