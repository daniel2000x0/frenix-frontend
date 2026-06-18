import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product/product.service';
import { Product } from '../../model/product.Model';

type Severity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

@Component({
  selector: 'app-profile-product',
  imports: [CommonModule, CardModule, ButtonModule, TagModule],
  templateUrl: './profile-product.html',
  styleUrl: './profile-product.css',
})
export class ProfileProduct implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (data) => (this.product = data),
      error: (err) => console.error('Error loading product', err),
    });
  }

  getStockSeverity(quantity: number): Severity {
    if (quantity > 10) return 'success';
    if (quantity > 0) return 'warn';
    return 'danger';
  }

  getStockLabel(quantity: number): string {
    if (quantity > 10) return 'EN STOCK';
    if (quantity > 0) return 'POCAS UNIDADES';
    return 'SIN STOCK';
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
