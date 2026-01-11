import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product.Model';
import { ProductService } from '../../service/product/product.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Category } from '../../model/category.Model';
type Severity =
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'secondary'
  | 'contrast';
@Component({
  selector: 'app-products',
  imports: [ CommonModule,
 
    CarouselModule,
    ButtonModule,
    CardModule,
    TagModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products  implements OnInit {
   category:Category[]=[];
    idcategory?: number;
    responsiveOptions: any[] | undefined;
    productos:Product[]=[];
      constructor(private router: Router, private cd: ChangeDetectorRef,private route: ActivatedRoute,private productService: ProductService) {
      }
  ngOnInit(): void {
this.loadProducts(); 
  /* this.route.paramMap.subscribe(params => {
      this.idcategory = Number(params.get('idCategory'));
      this.loadProducts();
    });*/

    this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ]
  }
  categories = [
    { categoryid: 1, categoryname: 'Electrónica', icon: 'pi pi-desktop', slug: 'electronics' },
    { categoryid: 2, categoryname: 'Ropa', icon: 'pi pi-shopping-bag', slug: 'clothing' },
    { categoryid: 3, categoryname: 'Hogar', icon: 'pi pi-home', slug: 'home' },
    { categoryid: 4, categoryname: 'Accesorios', icon: 'pi pi-star', slug: 'accessories' },
  ];
loadProducts(): void {
  this.productService.getProduct().subscribe({
    next: (products: Product[]) => {
      console.log('Datos recibidos del backend:', products); // ✅ validación
      this.productos = products;
       this.cd.detectChanges(); 
    },
    error: (err) => console.error('Error al obtener productos:', err)
  });
}

 getSeverity(quantity: number): Severity {
    if (quantity > 10) {
      return 'success';
    }

    if (quantity > 0) {
      return 'warn';
    }

    return 'danger';
  }
    goToCategory(categoryid: number) {
    this.router.navigate(['/products'], { queryParams: { category: categoryid } });
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
