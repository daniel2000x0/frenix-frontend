import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { rolGuard } from './guards/rol-guard';

export const routes: Routes = [

    {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then(c => c.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register')
        .then(c => c.Register)
  },


  {
     path: '',
    loadComponent: () =>
       import('./features/home/home/home')
        .then(c => c.Home)
  },
{
  path: 'products',
  loadChildren: () =>
    import('./features/products/products.routes')
      .then(r => r.PRODUCTS_ROUTES)
},
{
 path: 'auth',
 loadChildren:() =>
    import('./features/auth/auth.routes')
      .then(r => r.AUTH_ROUTES)
},
  
  {
     path: 'shopping-cart',
    loadComponent: () =>
       import('./features/shopping-card/shopping-card')
        .then(c => c.ShoppingCard),
          canActivate: [authGuard, rolGuard]
  },
  {
      path: 'unauthorized',
    loadComponent: () =>
       import('./shared/unauthorized/unauthorized')
        .then(c => c.Unauthorized)
  },
  {
    path:'Contact',
    loadComponent: () =>
       import('./features/contact/contact')
    .then(c => c.Contact)
  },
  {
     path:'About',
     loadComponent:()=>
        import('./features/about/about')
     .then(c=>c.About)
   },
   {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routing')
        .then(r => r.ADMIN_ROUTES)
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/order.routing')
        .then(r => r.ORDERS_ROUTES)
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./features/payment/payment.routes')
        .then(r => r.PAYMENT_ROUTES)
  }
];
