import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';
import { rolGuard } from '../../guards/rol-guard';

export const ORDERS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard, rolGuard],
    data: {
      roles: ['CUSTOMER', 'ADMIN']
    },
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full'
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create-order/create-order')
            .then(c => c.CreateOrder)
      },
      {
        path: '**',
        redirectTo: 'create'
      }
    ]
  }
];
