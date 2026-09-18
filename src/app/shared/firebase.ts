import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

/**
 * The one Firebase app for the site. The admin dashboard adds Auth on top of
 * this (see admin/firebase.ts); public pages only ever need Firestore.
 */
export const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApps()[0];

export const db = getFirestore(app);
