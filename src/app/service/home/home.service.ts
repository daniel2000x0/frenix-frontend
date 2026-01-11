import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
private readonly baseUrl = `${enviroment.api.baseUrl}products/home`;
  /*. Hero / Oferta principal
2. Ofertas del mes
3. Categorías
4. Productos destacados
5. Beneficios
6. Testimonios / marcas
7. Newsletter*/
  constructor(private _http: HttpClient){}
  ofertas(month: Date){
 return this._http.get(`${this.baseUrl}/offers?month=${month.toISOString()}`);
  }

  category(){
  return this._http.get(`${this.baseUrl}/categories`);
  }
  productodestacado(){
  return this._http.get(`${this.baseUrl}/featured-products`);
  }

}
