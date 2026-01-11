import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = enviroment.api.baseUrl;
  constructor(private http: HttpClient){}
  hasrole(role: string){
  return this.http.get(`${this.baseUrl}/users/userrole?role=${role}`);
  }
  
}
