import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface PaymentOption {
  label: string;
  value: string;
  icon: string;
}

@Component({
  selector: 'app-payment-method',
  imports: [CommonModule, CardModule, ButtonModule, SelectButtonModule, FormsModule],
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.css',
})
export class PaymentMethod {
  paymentOptions: PaymentOption[] = [
    { label: 'Tarjeta de Crédito', value: 'credit_card', icon: 'pi pi-credit-card' },
    { label: 'PayPal', value: 'paypal', icon: 'pi pi-paypal' },
    { label: 'Transferencia', value: 'transfer', icon: 'pi pi-building' },
  ];
  selectedMethod: string = 'credit_card';

  constructor(private router: Router) {}

  proceed() {
    this.router.navigate(['/payment/process'], { queryParams: { method: this.selectedMethod } });
  }
}
