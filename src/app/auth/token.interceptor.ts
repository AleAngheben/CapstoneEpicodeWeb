import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { take, switchMap, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSrv: AuthService) {}

  newReq!: HttpRequest<any>;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        this.newReq = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${user.token}`),
        });
        return next.handle(this.newReq);
      })
    );
  }
}
