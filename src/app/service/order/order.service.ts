import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../environments/enviroment';
import { CreateOrderDto } from '../../dto/order.dto';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly baseUrl = `${enviroment.api.baseUrl}/orders`;
  constructor(private http: HttpClient) {}
  create(data: CreateOrderDto): Observable<any> { return this.http.post(this.baseUrl, data); }
  getAll(): Observable<any[]> { return this.http.get<any[]>(this.baseUrl); }
  getById(id: number): Observable<any> { return this.http.get<any>(`${this.baseUrl}/${id}`); }
  getByCustomer(customerId: number): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/customer/${customerId}`); }
}
