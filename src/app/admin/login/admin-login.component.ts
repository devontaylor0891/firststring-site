import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  private auth = inject(AdminAuthService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  async signInWithGoogle(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.auth.loginWithGoogle();
      this.router.navigate(['/admin/dashboard']);
    } catch (err: unknown) {
      const msg = (err as Error).message ?? '';
      if (msg === 'not-admin') {
        this.error.set('This Google account is not authorized as admin.');
      } else if ((err as { code?: string }).code === 'auth/popup-closed-by-user') {
        // user closed popup — no error needed
      } else {
        this.error.set('Sign-in failed. Please try again.');
      }
    } finally {
      this.loading.set(false);
    }
  }
}
