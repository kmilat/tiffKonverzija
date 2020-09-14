
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { GlobalVar } from '../globalVar';
import { TranslateService } from '@ngx-translate/core';
import { Config } from '../config';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlikeService {

  constructor(
    public http: HttpClient,
    public appServis: AppService,
    public globalVar: GlobalVar,
    public translate: TranslateService,
    public config: Config
  ) { }




  getSlike(data) {
    return this.http.get(this.config.API_URL + 'datotekas', data)
      .pipe(
        retry(this.config.APIRetryCount), // retry failan request APIRetryCount puta
        catchError(this.appServis.handleError('SlikeService.getSlike'))
      );
  }

  getKonverzije(data) {
    return this.http.get(this.config.API_URL + 'konverzijas', data)
      .pipe(
        retry(this.config.APIRetryCount), // retry failan request APIRetryCount puta
        catchError(this.appServis.handleError('SlikeService.getKonverzije'))
      );
  }


}
