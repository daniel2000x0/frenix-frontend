import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/product/product.service';
import { Product } from '../../../model/product.Model';

type Severity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

@Component({
  selector: 'app-list-products',
  imports: [CommonModule, TableModule, ButtonModule, CardModule, InputTextModule, TagModule],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})
export class ListProducts implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProduct().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error loading products', err),
    });
  }

  getSeverity(quantity: number): Severity {
    if (quantity > 10) return 'success';
    if (quantity > 0) return 'warn';
    return 'danger';
  }

  getInventoryLabel(quantity: number): string {
    if (quantity > 10) return 'EN STOCK';
    if (quantity > 0) return 'POCAS UNIDADES';
    return 'SIN STOCK';
  }

  createProduct() {
    this.router.navigate(['/products/create']);
  }

  viewProduct(id: string) {
    this.router.navigate(['/products', id]);
  }

  editProduct(id: string) {
    this.router.navigate(['/products', id]);
  }
}
