import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorSrv: ErrorService,
    private snackBar: SnackBarComponent
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.errorSrv.setError(err.error.message);
        this.errorSrv.getError();

        this.snackBar.errorSnackbar(err.error.message);
        return of(err.error);
      })
    );
  }
}
