import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GlobalVar } from '../globalVar';
import { Config } from '../config';
import { AppService } from './app.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    public config: Config,
    private router: Router,
    private globalVar: GlobalVar,
    private appService: AppService,
    private messageService: MessageService,
    public translate: TranslateService, ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.config.devMode === 0 && this.globalVar.loginFunction === 0) {
      if (this.globalVar.korisnikToken.length > 0) {
        return this.checkForViewRole(route);
      } else {
        this.router.navigate(['login-page']);
        return false;
      }
    } else {
      return true;
    }
  }

  canLoad(route: Route): boolean {
    if (this.config.devMode === 0 && this.globalVar.loginFunction === 1) {
      if (this.globalVar.korisnikToken.length > 0) {
        return true;
      } else {
        this.router.navigate(['login-page']);
        return false;
      }
    } else {
      return true;
    }
  }
  checkForViewRole(route) {
    let found = false;

    // ako se radi o adminu - superuseru - vidi sve, pustam u sve komponente
    if (this.globalVar.loginFunction > 0) {
      found = true;
    } else {
      if (this.globalVar.korisnikKomponente !== null) {
        for (let i = 0; i < this.globalVar.korisnikKomponente.length; i++) {
          // ako imam pravo na komponentu imam pravo i na children
          if ('/' + route.routeConfig.path.toString() === (this.globalVar.korisnikKomponente[i].path || this.globalVar.korisnikKomponente[i].pathParent)) {
            found = true;
            break;
          }
        }
      }
    }


    if (found) {
      return true;
    } else {
      this.appService.prikaziToast('error', null, this.translate.instant('NematePravoNaOdabranuFormu'), this.globalVar.trajanjeErrAlert);
      return false;
    }
  }

}
