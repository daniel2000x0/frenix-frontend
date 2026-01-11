import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/enviroment';
import { Product } from '../../model/product.Model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TopProductDto } from '../../dto/topproducts.dto';

// Definimos la interfaz Product (opcional, para tipado)


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private  readonly urlbase = enviroment.api.baseUrl;
  constructor(private _http: HttpClient) {}

  getproductscategory(category: string): Promise<Product[]|undefined> {
    return this._http.get<Product[]>(`${this.urlbase}/products?category=${category}`).toPromise();
  }
  getProduct (): Observable<Product[]> {
    console.log(`${this.urlbase}/products`);
  return this._http.get<Product[]>(`${this.urlbase}/products`);
}
getTopProducts(): Observable<TopProductDto[]> {
  console.log(`${this.urlbase}/products/recomendaciones`);
  return this._http.get<TopProductDto[]>(`${this.urlbase}/products/recomendaciones`);
  // Simulamos una lista de productos
}
getlistaProducts():Observable<TopProductDto[]>{
  console.log(`${this.urlbase}/products/lista-home`);
  return this._http.get<TopProductDto[]>(`${this.urlbase}/products/lista-home`);
}
}