import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config } from 'src/app/config';
import { GlobalVar } from './globalVar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SlikeFrontend';

  constructor(
    public config: Config,
    public translate: TranslateService,
    public globalVar: GlobalVar
  ) {
  

    translate.addLangs(['hr', 'en']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/hr|en/) ? browserLang : 'hr');
  }
}
