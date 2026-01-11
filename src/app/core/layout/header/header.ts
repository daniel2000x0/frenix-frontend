import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MenubarModule,
    ButtonModule,AvatarModule,MenuModule,],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(  private router: Router) {}
  items = [
    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/' },
    { label: 'Products', icon: 'pi pi-fw pi-tags', routerLink: '/products' },
    { label: 'About', icon: 'pi pi-fw pi-info-circle', routerLink: '/About' },
    { label: 'Contact', icon: 'pi pi-fw pi-envelope', routerLink: '/Contact' }
  ];

  item = [
     {
    label: 'Register',
    icon: 'pi pi-sign-up',
    command: () => this.goRegister()
  },
  {
    label: 'Login',
    icon: 'pi pi-sign-in',
    command: () => this.goLogin()
  },
   {
    label: 'Perfil',
    icon: 'pi pi-user',
    command: () => this.goProfile()
  },
  {
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => this.logout()
  }
];

goProfile() {
   this.router.navigate(['/auth/profile']);
}
goRegister() {
   this.router.navigate(['/register']);
}

goLogin() {
   this.router.navigate(['/login']);
}

logout() {
  console.log('Logout');
  this.router.navigate(['/login']);
}

}
