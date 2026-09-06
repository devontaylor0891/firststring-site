import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApiService, StatsResponse } from '../services/admin-api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  private api = inject(AdminApiService);

  stats = signal<StatsResponse | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.api.getStats().subscribe({
      next: (data) => { this.stats.set(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to load stats'); this.loading.set(false); },
    });
  }

  formatCurrency(cents: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(cents / 100);
  }

  getBarHeight(count: number, max: number): number {
    if (max === 0) return 0;
    return Math.max(4, Math.round((count / max) * 100));
  }

  getRevenueTrendMax(): number {
    return Math.max(1, ...( this.stats()?.revenueTrend ?? []).map(t => t.total));
  }

  getSignupTrendMax(): number {
    return Math.max(1, ...(this.stats()?.signupTrend ?? []).map(t => t.count));
  }

  formatMonth(m: string): string {
    const [year, month] = m.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('en-US', { month: 'short' });
  }

  formatDay(d: string): string {
    return new Date(d + 'T00:00:00').toLocaleString('en-US', { month: 'short', day: 'numeric' });
  }
}
