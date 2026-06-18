import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { OrderService } from '../../../service/order/order.service';
import { ProductService } from '../../../service/product/product.service';
import { Product } from '../../../model/product.Model';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, SelectModule, TableModule],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css',
})
export class CreateOrder implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService,
    private productService: ProductService,
    public router: Router
  ) {
    this.orderForm = this.fb.group({
      customername: ['', Validators.required],
      customercountry: ['', Validators.required],
      customercity: ['', Validators.required],
      customerregion: [''],
      customerzip: [''],
      customeraddress: ['', Validators.required],
      customerphone: ['', Validators.required],
      orderDetails: this.fb.array([])
    });
  }

  ngOnInit() {
    this.loadProducts();
    const customer = this.authService.currentCustomerValue;
    if (customer) {
      this.orderForm.patchValue({
        customername: `${customer.customerfirstname} ${customer.customerlastname}`.trim(),
      });
    }
  }

  get orderDetails(): FormArray {
    return this.orderForm.get('orderDetails') as FormArray;
  }

  loadProducts() {
    this.productService.getProduct().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error loading products', err),
    });
  }

  addLineItem() {
    const group = this.fb.group({
      productid: ['', Validators.required],
      productname: [{ value: '', disabled: true }],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitprice: [0, [Validators.required, Validators.min(0)]],
      discount: [0],
    });

    group.get('productid')?.valueChanges.subscribe(val => {
      if (val) {
        const product = this.products.find(p => p.productid === val);
        if (product) {
          group.patchValue({
            productname: product.productname,
            unitprice: product.productprice,
          }, { emitEvent: false });
        }
      }
    });

    this.orderDetails.push(group);
  }

  removeLineItem(index: number) {
    this.orderDetails.removeAt(index);
  }

  getLineTotal(index: number): number {
    const group = this.orderDetails.at(index);
    const qty = group.get('quantity')?.value || 0;
    const price = group.get('unitprice')?.value || 0;
    const discount = group.get('discount')?.value || 0;
    return qty * price * (1 - discount / 100);
  }

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.orderDetails.length; i++) {
      total += this.getLineTotal(i);
    }
    return total;
  }

  submit() {
    if (this.orderForm.invalid) return;
    const customer = this.authService.currentCustomerValue;
    if (!customer) return;
    const formValue = this.orderForm.getRawValue();
    const dto = {
      customerid: customer.customerid,
      customercountry: Number(formValue.customercountry),
      customername: formValue.customername,
      customercity: formValue.customercity,
      customerregion: formValue.customerregion,
      customerzip: formValue.customerzip,
      customeraddress: formValue.customeraddress,
      customerphone: formValue.customerphone,
      orderDetails: formValue.orderDetails.map((d: any) => ({
        productid: Number(d.productid),
        quantity: Number(d.quantity),
        unitprice: Number(d.unitprice),
        discount: d.discount ? Number(d.discount) : undefined,
      })),
    };
    this.orderService.create(dto).subscribe({
      next: () => this.router.navigate(['/orders/history']),
      error: (err) => console.error('Error creating order', err),
    });
  }
}
