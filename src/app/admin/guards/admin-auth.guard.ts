import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminAuthGuard: CanActivateFn = async () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  const authenticated = await auth.checkAuth();
  if (!authenticated) {
    return router.createUrlTree(['/admin/login']);
  }
  return true;
};
