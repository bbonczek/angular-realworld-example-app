import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services';

export const BYPASS_JWT_TOKEN = new HttpContextToken(() => false);

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (!req.context.get(BYPASS_JWT_TOKEN)) {
      const token = this.jwtService.getToken();

      if (token) {
        headersConfig['Authorization'] = `Token ${token}`;
      }
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
