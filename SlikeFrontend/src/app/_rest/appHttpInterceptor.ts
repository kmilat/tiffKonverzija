import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVar } from 'src/app/globalVar';
import { Config } from 'src/app/config';



@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private globali: GlobalVar, private route: ActivatedRoute, public konfig:Config) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


      
        
        req = req.clone({ setHeaders: { 'Authorization': this.globali.korisnikToken } });

        return next.handle(req);
    }
}
