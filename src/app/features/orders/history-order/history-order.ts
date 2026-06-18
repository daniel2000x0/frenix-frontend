import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { OrderService } from '../../../service/order/order.service';
import { AuthService } from '../../../service/auth/auth.service';
import { OrderDetail } from '../../../model/order.Model';

type Severity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

@Component({
  selector: 'app-history-order',
  imports: [CommonModule, TableModule, CardModule, ButtonModule, TagModule],
  templateUrl: './history-order.html',
  styleUrl: './history-order.css',
})
export class HistoryOrder implements OnInit {
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const customer = this.authService.currentCustomerValue;
    if (customer) {
      this.orderService.getByCustomer(customer.customerid).subscribe({
        next: (data) => (this.orders = data),
        error: (err) => console.error('Error loading orders', err),
      });
    }
  }

  getStatusSeverity(status: string): Severity {
    switch (status?.toLowerCase()) {
      case 'completed': return 'success';
      case 'processing': return 'info';
      case 'pending': return 'warn';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  }

  viewOrder(id: number) {
    this.router.navigate(['/orders', id]);
  }

  createOrder() {
    this.router.navigate(['/orders/create']);
  }
}
