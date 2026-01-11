import { Routes } from '@angular/router';
import { rolGuard } from '../../guards/rol-guard';
import { authGuard } from '../../guards/auth-guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard, rolGuard],
    data: {
      roles: ['ADMIN']},
    children: [
      {
         
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      
      },
    {
 path: 'dashboard',
 loadComponent: () =>
   import('./pages/dashboard/dashboard')
     .then(c => c.Dashboard)
    }
    
    
    ]
  }]