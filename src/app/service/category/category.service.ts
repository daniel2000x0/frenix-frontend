import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/enviroment';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.Model';
import { Category } from '../../model/category.Model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly urlBase=`${enviroment.api.baseUrl}/categories`;

  constructor(private _http: HttpClient){

  }
  getAllCategories():Observable<Category[]>{
      console.log(`${this.urlBase}/all`);
    return this._http.get<Category[]>(`${this.urlBase}/all`);
  }
}
