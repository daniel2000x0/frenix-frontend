import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MenubarModule, ButtonModule, AvatarModule, MenuModule, BadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  cartCount = 0;
  isAuthenticated = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.currentCustomer$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isAuthenticated = this.authService.isAuthenticated();
      });
    this.updateCartCount();
    window.addEventListener('storage', this.onStorageChange);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('storage', this.onStorageChange);
  }

  private onStorageChange = () => this.updateCartCount();

  updateCartCount() {
    try {
      const cart = localStorage.getItem('cart');
      this.cartCount = cart ? JSON.parse(cart).length : 0;
    } catch {
      this.cartCount = 0;
    }
  }

  items = [
    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/' },
    { label: 'Products', icon: 'pi pi-fw pi-tags', routerLink: '/products' },
    { label: 'About', icon: 'pi pi-fw pi-info-circle', routerLink: '/About' },
    { label: 'Contact', icon: 'pi pi-fw pi-envelope', routerLink: '/Contact' }
  ];

  userMenuItems = [
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

  authMenuItems = [
    {
      label: 'Iniciar sesión',
      icon: 'pi pi-sign-in',
      command: () => this.goLogin()
    },
    {
      label: 'Registrarse',
      icon: 'pi pi-user-plus',
      command: () => this.goRegister()
    }
  ];

  goProfile() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/auth/profile']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goCart() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/shopping-cart']);
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.cartCount = 0;
    this.router.navigate(['/login']);
  }
}
