import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Product } from '../../../../model/product.Model';
import { ProductService } from '../../../../service/product/product.service';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule, TableModule, ButtonModule, CardModule, DialogModule,
    InputTextModule, InputNumberModule, SelectModule, TextareaModule,
    FormsModule, ConfirmDialogModule, ToastModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];
  productDialog = false;
  editMode = false;
  
  selectedProduct: Product = this.emptyProduct();
  categoryOptions = [
    { id: 1, name: 'Electrónica' },
    { id: 2, name: 'Ropa' },
    { id: 3, name: 'Hogar' },
    { id: 4, name: 'Accesorios' },
  ];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  emptyProduct(): Product {
    return {
      serial: 0,
      productid: '',
      productsku: '',
      productname: '',
      productprice: 0,
      productdiscount: 0,
      productquantity: 0,
      productmanufacture: 0,
      productcategory: 0,
      productuser: 0,
      productdescription: '',
      productview: 0,
    };
  }

  loadProducts() {
    this.productService.getProduct().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err: unknown) => {
        console.error('Error loading products', err);
      },
    });
  }

  openNew() {
    this.selectedProduct = this.emptyProduct();
    this.editMode = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.selectedProduct = { ...product };
    this.editMode = true;
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de eliminar "${product.productname}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.productid).subscribe({
          next: () => {
            this.products = this.products.filter((p) => p.productid !== product.productid);
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'Producto eliminado correctamente',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el producto',
            });
            console.error('Error deleting product', err);
          },
        });
      },
    });
  }

  saveProduct() {
    if (this.editMode) {
      this.productService.updateProduct(this.selectedProduct.productid, this.selectedProduct).subscribe({
        next: () => {
          const index = this.products.findIndex((p) => p.productid === this.selectedProduct.productid);
          if (index >= 0) {
            this.products[index] = { ...this.selectedProduct };
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Producto actualizado correctamente',
          });
          this.productDialog = false;
        },
        error: (err) => {
          console.error('Error updating product', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el producto',
          });
        },
      });
    } else {
      this.productService.createProduct(this.selectedProduct).subscribe({
        next: () => {
          this.products.push({ ...this.selectedProduct });
          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: 'Producto creado correctamente',
          });
          this.productDialog = false;
        },
        error: (err) => {
          console.error('Error creating product', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el producto',
          });
        },
      });
    }
  }

  hideDialog() {
    this.productDialog = false;
  }
}
