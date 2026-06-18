import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/product/product.service';
import { CategoryService } from '../../../service/category/category.service';
import { Category } from '../../../model/category.Model';

@Component({
  selector: 'app-create-products',
  imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, InputNumberModule, SelectModule, ButtonModule],
  templateUrl: './create-products.html',
  styleUrl: './create-products.css',
})
export class CreateProducts implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      productsku: ['', Validators.required],
      productname: ['', Validators.required],
      productprice: [0, [Validators.required, Validators.min(0)]],
      productdescription: [''],
      productquantity: [0, [Validators.required, Validators.min(0)]],
      productcategory: [null, Validators.required],
      productmanufacture: [null, Validators.required],
    });

    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error loading categories', err),
    });
  }

  onSubmit() {
    if (this.productForm.invalid || this.loading) return;

    this.loading = true;
    this.productService.createProduct(this.productForm.value).subscribe({
      next: () => {
        this.router.navigate(['/products/list-products-home']);
      },
      error: (err) => {
        console.error('Error creating product', err);
        this.loading = false;
      },
    });
  }

  onCancel() {
    this.router.navigate(['/products']);
  }
}
