import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.css',
})
export class HomeAdmin {
  today = new Date().toLocaleDateString();

  quickStats = [
    { label: 'Productos', value: 1250, icon: 'pi pi-box', route: '/admin/products' },
    { label: 'Usuarios', value: 340, icon: 'pi pi-users', route: '/admin/users/list' },
    { label: 'Ordenes', value: 890, icon: 'pi pi-shopping-cart', route: '/admin/orders' },
    { label: 'Categorias', value: 15, icon: 'pi pi-tags', route: '/admin/categories' },
  ];

  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
