import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadComponent: () => import('./users-list/users').then(c => c.Users) },
  { path: 'create', loadComponent: () => import('./users-create/users-create').then(c => c.UsersCreate) },
];
