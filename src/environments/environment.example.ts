// Template for `environment.ts` (local dev).
//
// Setup:
//   1. Copy this file to `environment.ts` in the same directory.
//   2. Fill in the values from the Firebase console:
//      Project settings -> General -> Your apps -> SDK setup and configuration.
//   3. Set `adminEmail` to the account allowed into /admin.
//
// `environment.prod.ts` is NOT written by hand - `set-env.js` generates it
// from `.env` during `npm run build`. See `.env.example`.
//
// Both `environment.ts` and `environment.prod.ts` are gitignored. This
// template is the only one committed.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT.firebasestorage.app',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'YOUR_MEASUREMENT_ID',
  },
  adminEmail: 'you@example.com',
};
