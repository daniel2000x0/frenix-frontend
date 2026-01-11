import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../service/user/user.service';

export const rolGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data?.['roles'] as string[];

  if (!auth.isAuthenticated()) {
     router.navigate(['/login'], {
      queryParams: { redirect: state.url },
    });
    return false;
  }
  console.log('Roles esperados:', expectedRoles);
  // rol warning
      if (!auth.hasRole(expectedRoles)) {
        console.log('Usuario no autorizado para este rol');
     router.navigate(['/unauthorized']);
    return false;
  }
   console.log('Usuario autorizado');
  return true;

 
};
