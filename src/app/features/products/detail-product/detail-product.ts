import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../../service/product/product.service';
import { Product } from '../../../model/product.Model';

type Severity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule, CardModule, TagModule, ButtonModule],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => (this.product = data),
        error: (err) => console.error('Error loading product', err),
      });
    }
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

  goBack() {
    this.router.navigate(['/products']);
  }
}
