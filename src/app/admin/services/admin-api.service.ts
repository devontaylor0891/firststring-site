import { Injectable } from '@angular/core';
import {
  collection,
  collectionGroup,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getCountFromServer,
  getAggregateFromServer,
  sum,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { db } from '../firebase';

// ── Types ────────────────────────────────────────────────────────────────────

export interface TeamMembership {
  teamId: string;
  teamName: string;
  roles: string[];
}

export interface UserRow {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  lastLogin: string | null;
  teams: TeamMembership[];
}

export interface TeamRow {
  id: string;
  name: string;
  managerUid: string;
  managerName: string;
  managerEmail: string;
  sport: string;
  memberCount: number;
  createdAt: string;
}

export interface PaymentRow {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amountCents: number;
  status: string;
  description: string;
  stripePaymentId: string;
  createdAt: string;
}

export interface SignupRow {
  id: string;
  email: string;
  name: string | null;
  source: string;
  createdAt: string;
}

export interface StatsResponse {
  kpis: {
    totalUsers: number;
    totalTeams: number;
    totalMembers: number;
    totalRevenueCents: number;
    totalSignups: number;
    newSignupsThisMonth: number;
  };
  signupTrend: { day: string; count: number }[];
  revenueTrend: { month: string; total: number }[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toDate(val: unknown): string | null {
  if (!val) return null;
  if (val instanceof Timestamp) return val.toDate().toISOString();
  if (typeof val === 'string') return val;
  return null;
}

function startOfMonth(): Date {
  const d = new Date(); d.setDate(1); d.setHours(0, 0, 0, 0); return d;
}

function daysAgo(n: number): Date {
  const d = new Date(); d.setDate(d.getDate() - n); d.setHours(0, 0, 0, 0); return d;
}

function toYMD(date: Date): string {
  return date.toISOString().split('T')[0];
}

function toYM(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function matchesSearch(search: string, ...fields: (string | null | undefined)[]): boolean {
  if (!search) return true;
  const term = search.toLowerCase();
  return fields.some(f => f?.toLowerCase().includes(term));
}

function userName(d: Record<string, unknown>): string {
  return (d['displayName'] as string)
    || (d['name'] as string)
    || (d['email'] as string)
    || '';
}

// ── Base data loader ─────────────────────────────────────────────────────────

interface BaseData {
  userMap: Map<string, { id: string; email: string; name: string; createdAt: string; lastLogin: string | null }>;
  teamMap: Map<string, { id: string; name: string; managerUid: string; sport: string; createdAt: string }>;
  membersByUser: Map<string, TeamMembership[]>;
  memberCountByTeam: Map<string, number>;
}

async function loadBaseData(): Promise<BaseData> {
  const [usersSnap, teamsSnap, membersSnap] = await Promise.all([
    getDocs(collection(db, 'users')),
    getDocs(collection(db, 'teams')),
    getDocs(collectionGroup(db, 'members')),
  ]);

  const userMap = new Map<string, { id: string; email: string; name: string; createdAt: string; lastLogin: string | null }>();
  usersSnap.forEach(doc => {
    const d = doc.data();
    userMap.set(doc.id, {
      id: doc.id,
      email:     (d['email']     as string) ?? '',
      name:      userName(d),
      createdAt: toDate(d['createdAt']) ?? '',
      lastLogin: toDate(d['lastLogin'] ?? d['lastSignIn'] ?? d['lastLogin']),
    });
  });

  const teamMap = new Map<string, { id: string; name: string; managerUid: string; sport: string; createdAt: string }>();
  teamsSnap.forEach(doc => {
    const d = doc.data();
    teamMap.set(doc.id, {
      id:         doc.id,
      name:       (d['name']       as string) ?? '(Unnamed Team)',
      managerUid: (d['managerUid'] as string) ?? '',
      sport:      (d['sport']      as string) ?? '',
      createdAt:  toDate(d['createdAt']) ?? '',
    });
  });

  // Build membership maps from members subcollection
  const membersByUser = new Map<string, TeamMembership[]>();
  const memberCountByTeam = new Map<string, number>();

  membersSnap.forEach(doc => {
    const d = doc.data();
    const status = (d['status'] as string) ?? '';
    if (status !== 'active') return;

    const teamId = doc.ref.parent.parent?.id ?? '';
    const userUid = (d['userUid'] as string) ?? doc.id;
    const roles = (d['roles'] as string[]) ?? [];

    if (teamId) {
      memberCountByTeam.set(teamId, (memberCountByTeam.get(teamId) ?? 0) + 1);
    }

    if (userUid && teamId) {
      const team = teamMap.get(teamId);
      const list = membersByUser.get(userUid) ?? [];
      list.push({ teamId, teamName: team?.name ?? teamId, roles });
      membersByUser.set(userUid, list);
    }
  });

  return { userMap, teamMap, membersByUser, memberCountByTeam };
}

// ── Service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class AdminApiService {

  // ── Stats ──────────────────────────────────────────────────────────────────

  getStats(): Observable<StatsResponse> {
    return from(this._loadStats());
  }

  private async _loadStats(): Promise<StatsResponse> {
    const signupsRef = collection(db, 'signups');
    const paymentsRef = collection(db, 'payments');
    const monthStart = Timestamp.fromDate(startOfMonth());
    const sixMonthsAgo = Timestamp.fromDate(daysAgo(180));

    const [
      totalUsers,
      totalTeams,
      totalMembers,
      revenueSnap,
      totalSignups,
      newSignupsThisMonth,
    ] = await Promise.all([
      getCountFromServer(collection(db, 'users')).then(s => s.data().count),
      getCountFromServer(collection(db, 'teams')).then(s => s.data().count),
      getCountFromServer(collectionGroup(db, 'members')).then(s => s.data().count),
      getAggregateFromServer(
        query(paymentsRef, where('status', '==', 'succeeded')),
        { total: sum('amountCents') }
      ).catch(() => ({ data: () => ({ total: 0 }) })),
      getCountFromServer(signupsRef).then(s => s.data().count).catch(() => 0),
      getCountFromServer(query(signupsRef, where('createdAt', '>=', monthStart))).then(s => s.data().count).catch(() => 0),
    ]);

    // Signup trend (last 30 days)
    const signupTrend: { day: string; count: number }[] = [];
    try {
      const recentSignups = await getDocs(
        query(signupsRef, where('createdAt', '>=', Timestamp.fromDate(daysAgo(30))), orderBy('createdAt'))
      );
      const byDay: Record<string, number> = {};
      recentSignups.forEach(doc => {
        const ts = doc.data()['createdAt'] as Timestamp | undefined;
        if (ts) { const d = toYMD(ts.toDate()); byDay[d] = (byDay[d] ?? 0) + 1; }
      });
      signupTrend.push(...Object.entries(byDay).map(([day, count]) => ({ day, count })));
    } catch { /* signups collection may not exist yet */ }

    // Revenue trend (last 6 months)
    const revenueTrend: { month: string; total: number }[] = [];
    try {
      const recentPayments = await getDocs(
        query(paymentsRef, where('status', '==', 'succeeded'), where('createdAt', '>=', sixMonthsAgo), orderBy('createdAt'))
      );
      const byMonth: Record<string, number> = {};
      recentPayments.forEach(doc => {
        const ts = doc.data()['createdAt'] as Timestamp | undefined;
        const amt = (doc.data()['amountCents'] as number) ?? 0;
        if (ts) { const m = toYM(ts.toDate()); byMonth[m] = (byMonth[m] ?? 0) + amt; }
      });
      revenueTrend.push(...Object.entries(byMonth).map(([month, total]) => ({ month, total })));
    } catch { /* payments collection may not exist yet */ }

    return {
      kpis: {
        totalUsers,
        totalTeams,
        totalMembers,
        totalRevenueCents: (revenueSnap as { data: () => { total: number } }).data().total ?? 0,
        totalSignups,
        newSignupsThisMonth,
      },
      signupTrend,
      revenueTrend,
    };
  }

  // ── Users ──────────────────────────────────────────────────────────────────

  getUsers(params: { search?: string; page?: number; limit?: number } = {}):
    Observable<{ users: UserRow[]; total: number; page: number; limit: number }> {
    return from(this._loadUsers(params));
  }

  private async _loadUsers(params: { search?: string; page?: number; limit?: number }) {
    const { search = '', page = 1, limit: pageSize = 25 } = params;
    const { userMap, membersByUser } = await loadBaseData();

    let users: UserRow[] = Array.from(userMap.values()).map(u => ({
      ...u,
      teams: membersByUser.get(u.id) ?? [],
    }));

    if (search) users = users.filter(u => matchesSearch(search, u.name, u.email));

    users.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));

    const total = users.length;
    users = users.slice((page - 1) * pageSize, page * pageSize);
    return { users, total, page, limit: pageSize };
  }

  // ── Teams ──────────────────────────────────────────────────────────────────

  getTeams(params: { search?: string; sport?: string; page?: number; limit?: number } = {}):
    Observable<{ teams: TeamRow[]; total: number; page: number; limit: number }> {
    return from(this._loadTeams(params));
  }

  private async _loadTeams(params: { search?: string; sport?: string; page?: number; limit?: number }) {
    const { search = '', sport = '', page = 1, limit: pageSize = 25 } = params;
    const { userMap, teamMap, memberCountByTeam } = await loadBaseData();

    let teams: TeamRow[] = Array.from(teamMap.values()).map(t => {
      const manager = userMap.get(t.managerUid);
      return {
        id:           t.id,
        name:         t.name,
        managerUid:   t.managerUid,
        managerName:  manager?.name  ?? t.managerUid,
        managerEmail: manager?.email ?? '',
        sport:        t.sport,
        memberCount:  memberCountByTeam.get(t.id) ?? 0,
        createdAt:    t.createdAt,
      };
    });

    if (sport)  teams = teams.filter(t => t.sport === sport);
    if (search) teams = teams.filter(t => matchesSearch(search, t.name, t.managerName, t.managerEmail));

    teams.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));

    const total = teams.length;
    teams = teams.slice((page - 1) * pageSize, page * pageSize);
    return { teams, total, page, limit: pageSize };
  }

  // ── Payments ───────────────────────────────────────────────────────────────

  getPayments(params: { search?: string; status?: string; page?: number; limit?: number } = {}):
    Observable<{ payments: PaymentRow[]; total: number; totalRevenueCents: number; page: number; limit: number }> {
    return from(this._loadPayments(params));
  }

  private async _loadPayments(params: { search?: string; status?: string; page?: number; limit?: number }) {
    const { search = '', status = '', page = 1, limit: pageSize = 25 } = params;

    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
    if (status) constraints.push(where('status', '==', status));

    let snap;
    try {
      snap = await getDocs(query(collection(db, 'payments'), ...constraints, limit(1000)));
    } catch {
      return { payments: [], total: 0, totalRevenueCents: 0, page, limit: pageSize };
    }

    let payments: PaymentRow[] = snap.docs.map(doc => {
      const d = doc.data();
      return {
        id:              doc.id,
        userId:          (d['userId']          as string) ?? '',
        userName:        (d['userName']        as string) ?? '',
        userEmail:       (d['userEmail']       as string) ?? '',
        amountCents:     (d['amountCents']     as number) ?? 0,
        status:          (d['status']          as string) ?? 'succeeded',
        description:     (d['description']     as string) ?? '',
        stripePaymentId: (d['stripePaymentId'] as string) ?? '',
        createdAt:       toDate(d['createdAt']) ?? '',
      };
    }).filter(p => matchesSearch(search, p.userName, p.userEmail));

    const totalRevenueCents = payments.filter(p => p.status === 'succeeded').reduce((a, p) => a + p.amountCents, 0);
    const total = payments.length;
    payments = payments.slice((page - 1) * pageSize, page * pageSize);
    return { payments, total, totalRevenueCents, page, limit: pageSize };
  }

  // ── Sign-ups ───────────────────────────────────────────────────────────────

  getSignups(params: { search?: string; source?: string; page?: number; limit?: number } = {}):
    Observable<{ signups: SignupRow[]; total: number; bySource: { source: string; count: number }[]; trend: { day: string; count: number }[]; page: number; limit: number }> {
    return from(this._loadSignups(params));
  }

  private async _loadSignups(params: { search?: string; source?: string; page?: number; limit?: number }) {
    const { search = '', source = '', page = 1, limit: pageSize = 25 } = params;

    let snap;
    try {
      const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
      if (source) constraints.push(where('source', '==', source));
      snap = await getDocs(query(collection(db, 'signups'), ...constraints, limit(2000)));
    } catch {
      return { signups: [], total: 0, bySource: [], trend: [], page, limit: pageSize };
    }

    const all: SignupRow[] = snap.docs.map(doc => {
      const d = doc.data();
      return {
        id:        doc.id,
        email:     (d['email']  as string)         ?? '',
        name:      (d['name']   as string | null)  ?? null,
        source:    (d['source'] as string)         ?? 'marketing_site',
        createdAt: toDate(d['createdAt'])          ?? '',
      };
    });

    const sourceCounts: Record<string, number> = {};
    all.forEach(s => { sourceCounts[s.source] = (sourceCounts[s.source] ?? 0) + 1; });
    const bySource = Object.entries(sourceCounts).map(([src, count]) => ({ source: src, count })).sort((a, b) => b.count - a.count);

    const cutoff = daysAgo(60);
    const trendByDay: Record<string, number> = {};
    all.forEach(s => {
      if (!s.createdAt) return;
      const d = new Date(s.createdAt);
      if (d >= cutoff) { const day = toYMD(d); trendByDay[day] = (trendByDay[day] ?? 0) + 1; }
    });
    const trend = Object.entries(trendByDay).map(([day, count]) => ({ day, count })).sort((a, b) => a.day.localeCompare(b.day));

    let filtered = all.filter(s => matchesSearch(search, s.email, s.name));
    const total = filtered.length;
    filtered = filtered.slice((page - 1) * pageSize, page * pageSize);
    return { signups: filtered, total, bySource, trend, page, limit: pageSize };
  }
}
