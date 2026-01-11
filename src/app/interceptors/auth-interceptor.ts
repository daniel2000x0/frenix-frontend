import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../service/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
      const router = inject(Router);
const authservice =  inject(AuthService);
  const token = authservice.gettoken();
   const publicEndpoints = [
     '/register',
    '/login',
    '/categories/all',
    '/products/recomendaciones',
    '/About',
    '/Contact',
    '/products/lista-home',
    '/unauthorized'
  ];
  if (publicEndpoints.some(url => req.url.includes(url))) {
    return next(req);
  }
  //if(!publicEndpoints.some(url => req.url.includes(url))){

  //}
  if(!token){
        return next(req);
  }
  const auth =  req.clone({
    setHeaders:{
        Authorization: `Bearer ${token}`
    }
  
  });
  return next(auth).pipe(
    catchError((err) =>
    {

      if (err.status === 401) {
        if (authservice.isAuthenticated()) {
          authservice.logout(); 
        }
        router.navigate(['/login']);
      }


      if (err.status === 403) {
        Swal.fire('Oops!', 'No tienes acceso', 'warning');
        router.navigate(['/home']);
      }
      return throwError(() => err);
    }
    )
  );
};








/* version old
interceptor   un  HttpInterceptor  permite  interceptar  todas las peticiones 
HTTP antes de que salgan  y todas  las respuestas  antes que llegue  al servicio

export calss  AuthInterceptor implements HttpInterceptor{
   constructor(private authService: AuthService){}
   metodo  obligatorio  al  implementar  Http
   Se ejecuta  antes de que la  petition  HTTP salga  y antes de que llegue al servicio

   intercept(
   req -> representqa la peticion   HTTP original 
   es INMUTABLE
   req:HttpRequest<any>,
   // NEXT  es el siguiente  paso en la  cadena  de interceptores
   si no se llama next.handle(), la peticion no continua 
   next:HttpHandler
   ): Observable<HttpEvent<any>>{
   // se obtien el  token desde  authService
   // el  interceptor no sabe donde se guarda el token
   const token = this.authService.getToken();
   //  si no existe token
   // se envia la peticion original   sin modificar
   // 
   if(!token){
   return next.handle(req);
   }
   // se clona  la peticion  original  porque HttpRequst es inmutable 
   // se agrega el  header   Authorization  con el token 
   const authReq = req.clone({
    setHeaders: {
    // Header  standar  para  jwt
       Authorization: `Bearer ${token}`
     }
   });
   //  se envia  la nueva peticion  clonada
   continua hacia  otros  interceptores 
   return next.handle(authReq);

   }
}*/
