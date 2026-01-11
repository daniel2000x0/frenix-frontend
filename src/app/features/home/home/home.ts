import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';

import { CardModule } from 'primeng/card';

import { Router } from '@angular/router';
import { HomeService } from '../../../service/home/home.service';
import { Category } from '../../../model/category.Model';
import { AuthService } from '../../../service/auth/auth.service';
import { CategoryService } from '../../../service/category/category.service';
import { Observable } from 'rxjs';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { TopProductDto } from '../../../dto/topproducts.dto';
import { ProductService } from '../../../service/product/product.service';
type Severity =
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'secondary'
  | 'contrast';
@Component({
  selector: 'app-home',
  imports: [CardModule,CommonModule,ButtonModule,DataViewModule,CarouselModule,TagModule
  ], 
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home  implements OnInit {

 category = signal<Category[]>([]);
  productos =   signal<TopProductDto[]>([]);
   productospublic =   signal<TopProductDto[]>([]);
  responsiveOptions = [
  { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
  { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
  { breakpoint: '768px', numVisible: 2, numScroll: 1 },
  { breakpoint: '560px', numVisible: 1, numScroll: 1 },
];

  constructor(private productService: ProductService,
    private router: Router, private homeService: CategoryService,  private authService: AuthService) {}

    ngOnInit() {
//categories loading
this.homeService.getAllCategories().subscribe({
  next: (categories: Category[]) => {
    this.category.set(categories ?? []);
  },
  error: (err) => console.error('Error al obtener categorías:', err)
});

//products loading
console.log(this.category);
this.productService.getTopProducts().subscribe({
    next: (products: TopProductDto[]) => {
      console.log('Datos recibidos del backend:', products); // ✅ validación
      //this.productos = products;
      if(products){
      this.productos.set(products);
      }else{
        this.productos.set([]);
      }
    },
    error: (err) => console.error('Error al obtener productos:', err)
  });
 this.productService.getlistaProducts().subscribe({
    next: (products: TopProductDto[]) => {
      console.log('Datos recibidos del backend lista home:', products); 
     
      if(products){
      this.productospublic.set(products);
      }else{
        this.productospublic.set([]);
      }
    },
    error: (err) => console.error('Error al obtener productos lista home:', err)
  });
  console.log(this.productos);
}
    
  goToCategory(categoryid: number) {
   const   isAuthenticated=  this.authService.isAuthenticated();
      if (isAuthenticated) {
        this.router.navigate(['/products'], { queryParams: { category: categoryid } });
      } else {
        this.router.navigate(['/login']);
      }
    
  }
 /**Beneficios de la tienda */
 //Productos recomendados / para ti
 //Categorías visitadasMás vendidos
/* “Oferta por tiempo limitado”

Contador

Badge de descuento*/


 getSeverity(quantity: number): Severity {
    if (quantity > 10) {
      return 'success';
    }

    if (quantity > 0) {
      return 'warn';
    }

    return 'danger';
  }

  getInventoryLabel(quantity: number): string {
    if (quantity > 10) {
      return 'EN STOCK';
    }

    if (quantity > 0) {
      return 'POCAS UNIDADES';
    }

    return 'SIN STOCK';
  }
  onImageError(event: Event) {
  (event.target as HTMLImageElement).src = 'assets/img/products/imagendefault.png';
}
}
