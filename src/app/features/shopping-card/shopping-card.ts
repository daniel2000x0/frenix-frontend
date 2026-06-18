import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { Product } from '../../model/product.Model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-shopping-card',
  imports: [CommonModule, TableModule, ButtonModule, CardModule, InputNumberModule, FormsModule],
  templateUrl: './shopping-card.html',
  styleUrl: './shopping-card.css',
})
export class ShoppingCard implements OnInit {
  cartItems: CartItem[] = [];
  private readonly storageKey = 'cart';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        this.cartItems = JSON.parse(stored);
      } catch {
        this.cartItems = [];
      }
    }
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  addToCart(product: Product, quantity: number = 1) {
    const existing = this.cartItems.find(item => item.product.productid === product.productid);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.saveCart();
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.product.productid !== productId);
    this.saveCart();
  }

  updateQuantity() {
    this.cartItems = this.cartItems.filter(item => item.quantity > 0);
    this.saveCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.productprice * item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  checkout() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/orders/create']);
  }
}
