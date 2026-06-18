import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Rolesusuario {
  private readonly baseUrl = `${enviroment.api.baseUrl}/roles-usuario`;

  constructor(private http: HttpClient) {}

  getByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  assignRole(userId: number, roleId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, { userId, roleId });
  }

  removeRole(userId: number, roleId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/${userId}/role/${roleId}`);
  }
}
