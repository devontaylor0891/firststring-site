import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService, UserRow } from '../services/admin-api.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
})
export class AdminUsersComponent implements OnInit {
  private api = inject(AdminApiService);

  users = signal<UserRow[]>([]);
  total = signal(0);
  loading = signal(true);
  error = signal<string | null>(null);

  search = '';
  page = 1;
  readonly limit = 25;

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    const params: Record<string, string> = { page: String(this.page), limit: String(this.limit) };
    if (this.search) params['search'] = this.search;

    this.api.getUsers(params).subscribe({
      next: (res) => { this.users.set(res.users); this.total.set(res.total); this.loading.set(false); },
      error: () => { this.error.set('Failed to load users'); this.loading.set(false); },
    });
  }

  onSearch(): void { this.page = 1; this.load(); }
  prevPage(): void { if (this.page > 1) { this.page--; this.load(); } }
  nextPage(): void { if (this.page * this.limit < this.total()) { this.page++; this.load(); } }
  get totalPages(): number { return Math.ceil(this.total() / this.limit); }

  formatTeams(user: UserRow): string {
    if (!user.teams.length) return '—';
    return user.teams
      .map(t => `${t.teamName} · ${t.roles.join(', ')}`)
      .join('\n');
  }
}
