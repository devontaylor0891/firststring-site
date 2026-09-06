import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService, TeamRow } from '../services/admin-api.service';

@Component({
  selector: 'app-admin-teams',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-teams.component.html',
  styleUrl: './admin-teams.component.scss',
})
export class AdminTeamsComponent implements OnInit {
  private api = inject(AdminApiService);

  teams = signal<TeamRow[]>([]);
  total = signal(0);
  loading = signal(true);
  error = signal<string | null>(null);

  search = '';
  filterSport = '';
  page = 1;
  readonly limit = 25;

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    const params: Record<string, string> = { page: String(this.page), limit: String(this.limit) };
    if (this.search)      params['search'] = this.search;
    if (this.filterSport) params['sport']  = this.filterSport;

    this.api.getTeams(params).subscribe({
      next: (res) => { this.teams.set(res.teams); this.total.set(res.total); this.loading.set(false); },
      error: () => { this.error.set('Failed to load teams'); this.loading.set(false); },
    });
  }

  onSearch(): void { this.page = 1; this.load(); }
  onFilter(): void { this.page = 1; this.load(); }
  prevPage(): void { if (this.page > 1) { this.page--; this.load(); } }
  nextPage(): void { if (this.page * this.limit < this.total()) { this.page++; this.load(); } }
  get totalPages(): number { return Math.ceil(this.total() / this.limit); }
}
