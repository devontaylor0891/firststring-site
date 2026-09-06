import { Injectable, signal } from '@angular/core';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import { auth } from '../firebase';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  readonly isAuthenticated = signal(false);
  readonly adminEmail = signal<string | null>(null);

  private authReady: Promise<boolean>;

  constructor() {
    this.authReady = new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        const isAdmin = this.isAdminUser(user);
        this.isAuthenticated.set(isAdmin);
        this.adminEmail.set(isAdmin ? (user!.email ?? null) : null);
        resolve(isAdmin);
      });
    });
  }

  private isAdminUser(user: User | null): boolean {
    return user !== null && user.email === environment.adminEmail;
  }

  async checkAuth(): Promise<boolean> {
    await this.authReady;           // wait for Firebase to resolve initial session
    return this.isAuthenticated();  // read current signal, not the stale initial value
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    if (!this.isAdminUser(cred.user)) {
      await signOut(auth);
      throw new Error('not-admin');
    }
    this.isAuthenticated.set(true);
    this.adminEmail.set(cred.user.email ?? null);
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this.isAuthenticated.set(false);
    this.adminEmail.set(null);
  }
}
