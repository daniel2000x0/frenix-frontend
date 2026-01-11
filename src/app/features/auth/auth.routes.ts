import { Routes } from "@angular/router";
import { authGuard } from "../../guards/auth-guard";
import { rolGuard } from "../../guards/rol-guard";

export  const AUTH_ROUTES: Routes = [
{
 path: '',
    canActivate: [authGuard, rolGuard],
    data: {
      roles: ['CUSTOMER']
    },

    children:[
          {
    path: 'profile',
    canActivate: [authGuard, rolGuard],
    loadComponent: () =>
      import('./pages/profile/profile')
        .then(c => c.Profile)
  },
    ]
}

];