import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { AdminApiService, SignupRow } from '../services/admin-api.service';

@Component({
  selector: 'app-admin-signups',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-signups.component.html',
  styleUrl: './admin-signups.component.scss',
})
export class AdminSignupsComponent implements OnInit {
  private api = inject(AdminApiService);
  private fb = inject(FormBuilder);

  signups = signal<SignupRow[]>([]);
  total = signal(0);
  bySource = signal<{ source: string; count: number }[]>([]);
  trend = signal<{ day: string; count: number }[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  showAddForm = signal(false);
  addSuccess = signal(false);

  search = '';
  filterSource = '';
  page = 1;
  readonly limit = 25;

  addForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: [''],
    source: ['manual_admin'],
  });

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    const params: Record<string, string> = { page: String(this.page), limit: String(this.limit) };
    if (this.search)       params['search'] = this.search;
    if (this.filterSource) params['source'] = this.filterSource;

    this.api.getSignups(params).subscribe({
      next: (res) => {
        this.signups.set(res.signups);
        this.total.set(res.total);
        this.bySource.set(res.bySource);
        this.trend.set(res.trend);
        this.loading.set(false);
      },
      error: () => { this.error.set('Failed to load sign-ups'); this.loading.set(false); },
    });
  }

  onSearch(): void { this.page = 1; this.load(); }
  onFilter(): void { this.page = 1; this.load(); }
  prevPage(): void { if (this.page > 1) { this.page--; this.load(); } }
  nextPage(): void { if (this.page * this.limit < this.total()) { this.page++; this.load(); } }
  get totalPages(): number { return Math.ceil(this.total() / this.limit); }

  getBarHeight(count: number): number {
    const max = Math.max(1, ...this.trend().map(t => t.count));
    return Math.max(4, Math.round((count / max) * 100));
  }

  getSourcePct(count: number): number {
    const total = this.total();
    return total > 0 ? Math.round((count / total) * 100) : 0;
  }

  async addSignup(): Promise<void> {
    if (this.addForm.invalid) return;
    const { email, name, source } = this.addForm.value;
    await addDoc(collection(db, 'signups'), {
      email: email!,
      name: name || null,
      source: source || 'manual_admin',
      createdAt: Timestamp.now(),
    });
    this.addSuccess.set(true);
    this.addForm.reset({ source: 'manual_admin' });
    this.load();
    setTimeout(() => this.addSuccess.set(false), 3000);
  }

  formatDay(d: string): string {
    return new Date(d + 'T00:00:00').toLocaleString('en-US', { month: 'short', day: 'numeric' });
  }

  formatSource(s: string): string {
    return s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}
