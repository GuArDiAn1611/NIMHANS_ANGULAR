import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        var str1 = new String( "Bearer " ); 
        var str2 = new String(user._token); 
        var str3 = str1.concat(str2.toString());
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', str3)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
