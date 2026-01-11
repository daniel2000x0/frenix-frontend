import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';
import { rolGuard } from '../../guards/rol-guard';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard, rolGuard],
    data: {
      roles: ['ADMIN', 'CUSTOMER']
    },
    children: [
      {
        path: '',
        redirectTo: 'list-products-home',
        pathMatch: 'full'
      },
       {
        path: 'list-products-home',
        loadComponent: () =>
          import('./products')
            .then(c => c.Products)
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./list-products/list-products')
            .then(c => c.ListProducts)
      },

      {
        path: 'create',
        loadComponent: () =>
          import('./create-products/create-products')
            .then(c => c.CreateProducts)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./detail-product/detail-product')
            .then(c => c.DetailProduct)
      },
      {
        path: '**',
        redirectTo: 'list-products-home'
      }
    ]
  }
];
