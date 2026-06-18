import { Routes } from '@angular/router';
import { rolGuard } from '../../guards/rol-guard';
import { authGuard } from '../../guards/auth-guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard, rolGuard],
    data: {
      roles: ['ADMIN'],
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((c) => c.Dashboard),
      },
      {
        path: 'home-admin',
        loadComponent: () =>
          import('./pages/home-admin/home-admin').then((c) => c.HomeAdmin),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products').then((c) => c.Products),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/cartegories/cartegories').then((c) => c.Cartegories),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./pages/reports/reports').then((c) => c.Reports),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.routes').then((r) => r.USERS_ROUTES),
      },
    ],
  },
];
