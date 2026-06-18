import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product.Model';
import { ProductService } from '../../service/product/product.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

type Severity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule, CarouselModule, ButtonModule, CardModule, TagModule,
    InputTextModule, SelectModule, FormsModule, ProgressSpinnerModule, PaginatorModule,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  productos: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  searchTerm = '';
  selectedCategory: number | null = null;
  selectedSort = 'name-asc';
  first = 0;
  rows = 8;

  sortOptions = [
    { label: 'Nombre A-Z', value: 'name-asc' },
    { label: 'Nombre Z-A', value: 'name-desc' },
    { label: 'Precio: menor a mayor', value: 'price-asc' },
    { label: 'Precio: mayor a menor', value: 'price-desc' },
  ];

  private searchSubject = new Subject<string>();

  categories = [
    { categoryid: null, categoryname: 'Todas las categorías', icon: 'pi pi-th-large' },
    { categoryid: 1, categoryname: 'Electrónica', icon: 'pi pi-desktop' },
    { categoryid: 2, categoryname: 'Ropa', icon: 'pi pi-shopping-bag' },
    { categoryid: 3, categoryname: 'Hogar', icon: 'pi pi-home' },
    { categoryid: 4, categoryname: 'Accesorios', icon: 'pi pi-star' },
  ];

  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 },
  ];

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => {
      this.searchTerm = term;
      this.first = 0;
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProduct().subscribe({
      next: (products: Product[]) => {
        this.productos = products;
        this.applyFilters();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.loading = false;
      },
    });
  }

  onSearchInput(value: string) {
    this.searchSubject.next(value);
  }

  onCategoryChange() {
    this.first = 0;
    this.applyFilters();
  }

  onSortChange() {
    this.first = 0;
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.productos];

    if (this.selectedCategory) {
      result = result.filter(p => p.productcategory === this.selectedCategory);
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(p =>
        p.productname.toLowerCase().includes(term) ||
        p.productsku?.toLowerCase().includes(term) ||
        p.productdescription?.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      switch (this.selectedSort) {
        case 'name-desc':
          return b.productname.localeCompare(a.productname);
        case 'price-asc':
          return a.productprice - b.productprice;
        case 'price-desc':
          return b.productprice - a.productprice;
        default:
          return a.productname.localeCompare(b.productname);
      }
    });

    this.filteredProducts = result;
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

  goToCategory(categoryid: number) {
    this.selectedCategory = categoryid;
    this.onCategoryChange();
  }

  onPageChange(event: any) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 8;
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/products/imagendefault.png';
  }
}
