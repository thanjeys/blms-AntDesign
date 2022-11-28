import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const accessToken = sessionStorage.getItem('auth_token');
        // const accessToken = this.authStorageService.getAuthToken();
        const accessToken = null;
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + accessToken,
                'Content-Type': 'application/json'
            },
            url: environment.apiURL + req.url
        });
        return next.handle(req);
  }
}
