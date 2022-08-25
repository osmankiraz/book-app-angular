import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private router:Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status == '404') {
          alert('Sayfa Bulunamadı !');
        }
        else{
          alert("Bir hata meydana geldi ! ")
        }
        this.router.navigateByUrl("/")
        return throwError(error)
      })
    );
  }
}
