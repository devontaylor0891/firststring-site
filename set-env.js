const fs = require('fs');
const path = require('path');

// Load .env
const envFile = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf8');
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => line.split('=').map(s => s.trim()))
);

const content = `export const environment = {
  production: true,
  firebase: {
    apiKey: '${env.FIREBASE_API_KEY}',
    authDomain: '${env.FIREBASE_AUTH_DOMAIN}',
    projectId: '${env.FIREBASE_PROJECT_ID}',
    storageBucket: '${env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${env.FIREBASE_APP_ID}',
  },
  adminEmail: '${env.ADMIN_EMAIL}',
};
`;

fs.writeFileSync(path.resolve(__dirname, 'src/environments/environment.prod.ts'), content);
console.log('environment.prod.ts written from .env');
