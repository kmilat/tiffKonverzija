
import { Component, OnInit, Input } from '@angular/core';
import { GlobalVar } from 'src/app/globalVar';
import { AppService } from 'src/app/_services/app.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.scss']
})
export class ImgPreviewComponent implements OnInit {
  @Input() data;
  datoteka;


  loaded: boolean;
  imgSrc: any;
  srcSanitizer: any;
  type;
  myFile;

  constructor(
    public globalVar: GlobalVar,
    private appServis: AppService,
    private sanitizer: DomSanitizer,
    public translate: TranslateService, 
  ) {
    this.loaded = false;
  }

  ngOnInit() {
    if (this.data.saKlijenta) {

      this.datoteka = {};
      this.datoteka.izvorniOriginalname = this.data.data.name;
      this.datoteka.originalname = this.data.data.name;
      this.datoteka.saKlijenta = true;
      this.datoteka.mimetype = this.data.data.type;
      this.type = this.data.data.type;

      this._saKlijenta();
    }  else {
        this.datoteka = this.data;
        this.getPreview();
   
    }
  }

  _saKlijenta() {
    this.loaded = false;
    this.imgSrc = this.data ? this.data.file : this.datoteka.file;
    this.srcSanitizer = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgSrc);
    this.datoteka.mimetype = this.type;
    this.loaded = true;
  }




  getPreview() {
    this.loaded = false;
    let tempMimetype;

    if (this.datoteka.originalname) {
      tempMimetype = this.datoteka.mimetype;


      this.myFile = new Blob([this.datoteka.Blob], {
        type: tempMimetype
      });
      this.type = tempMimetype;
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(this.myFile);
    }
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imgSrc = reader.result;
    this.srcSanitizer = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgSrc);
    this.loaded = true;
  }


  download() {
    if (this.datoteka && this.myFile) {
      const fileName = this.datoteka.originalname;
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.target = '_blank';
      const fileURL = window.URL.createObjectURL(this.myFile);
      a.href = fileURL;
      a.download = fileName;
      a.click();
    }
  }
}
