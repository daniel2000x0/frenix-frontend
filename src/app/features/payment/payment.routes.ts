import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';
import { rolGuard } from '../../guards/rol-guard';

export const PAYMENT_ROUTES: Routes = [
  {
 
     path: '',
        canActivate: [authGuard, rolGuard],
        data: {
          roles: ['CUSTOMER', 'ADMIN']
        },
    children: [
      {
        path: '',
        redirectTo: 'method',
        pathMatch: 'full'
      },
      {
        path: 'method',
        loadComponent: () =>
          import('./pages/payment-method/payment-method')
            .then(c => c.PaymentMethod)
      },
      {
        path: 'process',
        loadComponent: () =>
          import('./pages/payment-process/payment-process')
            .then(c => c.PaymentProcess)
      },
      {
        path: 'result',
        loadComponent: () =>
          import('./pages/payment-result/payment-result')
            .then(c => c.PaymentResult)
      }
    ]
  }
];
