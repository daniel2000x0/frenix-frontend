import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../environments/enviroment';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly baseUrl = `${enviroment.api.baseUrl}/contact`;

  constructor(private http: HttpClient) {}

  send(data: ContactMessage): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
