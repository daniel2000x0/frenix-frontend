import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../../dto/login.dto';
import { enviroment } from '../../environments/enviroment';
import { Customer } from '../../model/customer.Model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'; 
import { CreateCustomerDto } from '../../dto/createCustomer.dto';
interface LoginResponse {
  access_token: string;
  customer: Customer;
}
export interface RegisterResponse {
  message: string;
  user: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentCustomerSubject = new BehaviorSubject<Customer | null>(
  this.getCurrentCustomerFromStorage()
);
private getCurrentCustomerFromStorage(): Customer | null {
  const currentCustomer = localStorage.getItem('currentCustomer');

  if (!currentCustomer) {
    return null;
  }

  try {
    return JSON.parse(currentCustomer) as Customer;
  } catch (error) {
    console.error('Error parsing currentCustomer from localStorage', error);
    localStorage.removeItem('currentCustomer');
    return null;
  }
}


  public currentCustomer$ = this.currentCustomerSubject.asObservable();
  private readonly baseUrl = `${enviroment.api.baseUrl}/auth`;
  constructor(private http: HttpClient){
  }
  get currentCustomerValue():Customer |null{
    return this.currentCustomerSubject.value;
  }

  register(registerData: CreateCustomerDto): Observable<RegisterResponse>{
     const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
    console.log(`${this.baseUrl}/registrar`);
    return  this.http.post<RegisterResponse>(`${this.baseUrl}/registrar`, registerData).pipe(
      map((response: RegisterResponse) => response),catchError(e => {

       if (e?.status === 400) {
    return throwError(() => e);
  }

  if (e?.error?.message) {
    console.error(e.error.message);
  } else {
    console.error('Error inesperado', e);
  }

  return throwError(() => e);
      })
    );
  }
  login(loginData: LoginDto): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginData).pipe(
      tap((res)=>{
          localStorage.setItem(enviroment.auth.token, res.access_token);
  
          localStorage.setItem('currentCustomer', JSON.stringify(res.customer));

          this.currentCustomerSubject.next(res.customer);
      })


    );
}

getPayload(): any | null {
    const token = enviroment.auth.token;
    if (!token) return null;
// warning
try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
} catch (error) {
  console.log(error + "try cach payload auth service");
  return null;
}
    
  }
   hasRole(roles: string[]): boolean {
      if (!roles || roles.length === 0) {
    return true;
  }
  //  warning
    const payload = this.getPayload();

     if (!payload || !payload.role || payload === null) {
    return false;
  }
    return  roles.includes(payload.role);
  }
logout(){
localStorage.removeItem('currentCustomer');
localStorage.removeItem(enviroment.auth.token);
this.currentCustomerSubject.next(null);
}
isAuthenticated():boolean{
  return !! localStorage.getItem(enviroment.auth.token);
}

gettoken():string |null {
return localStorage.getItem('access_token');
}
}
