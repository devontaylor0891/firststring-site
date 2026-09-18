import { getAuth } from 'firebase/auth';
import { app } from '../shared/firebase';

export { db } from '../shared/firebase';

export const auth = getAuth(app);
