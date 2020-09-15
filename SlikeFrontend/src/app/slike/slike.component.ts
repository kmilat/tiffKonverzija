import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalVar } from '../globalVar';
import { AppService } from '../_services/app.service';
import { MessageService } from 'primeng/api';
import { SlikeService } from '../_services/slike.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Config } from '../config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-slike',
  templateUrl: './slike.component.html',
  styleUrls: ['./slike.component.scss']
})
export class SlikeComponent implements OnInit {
  slikeData = [] as any;

  konverzijeData = [] as any;
  konverzijeDataHOLD = [] as any;

  filter;




  uploadedFiles = [] as any;
  displayDialog = false;
  dialogHeader;
  docID = 0; // 'identifikator' za dokumente
  selectedDoc;


  @Output() public onUploadFinished = new EventEmitter();
  public progress: number;
  public message: string;
  constructor(
    public appService: AppService,
    public globalVar: GlobalVar,
    public messageService: MessageService,
    public http: HttpClient,
    public translate: TranslateService,
    public config: Config,
    public slikeService: SlikeService
  ) {




  }

  ngOnInit(): void {
    this.getData();
  }




  async getData() {
    this.konverzijeData = [];
    this.konverzijeDataHOLD = [];
    this.slikeData = [];
    await Promise.all([this.getSlike(), this.getKonverzije()]);


    // svakoj konverziji dodjeljujem njene slike 
    this.konverzijeDataHOLD.forEach(konverzija => {
      konverzija.slike = this.slikeData.filter(slika => {
        return slika.pkKonverzija === konverzija.pkKonverzija
      });

      // postavljam tiff datoteku 
      konverzija.tiff = this.slikeData.filter(slika => {
        return slika.pkDatoteka === konverzija.pkResDatoteka
      });

      konverzija.dateAdded = this.appService.formatDateTime(konverzija.dateAdded);
      konverzija.selectedSlika = {};
    });

    this.onFilterChanged();

  }




  rowClicked(konverzija, slika) {
    konverzija.selectedSlika = slika
    if (!slika.Blob) {
      this.getFile(konverzija, false);
    } else {
      this.refreshSlika(konverzija)
    }
  }

  refreshSlika(konverzija) {
    konverzija.DOM = document.getElementById('konverzija' + konverzija.pkKonverzija).getBoundingClientRect();
    if (konverzija.DOM) {
      konverzija.minHeight = konverzija.DOM.height + 'px';
    }

    konverzija.slikaChanging = true;
    setTimeout(() => {

      konverzija.prikaziSliku = false;
      setTimeout(() => {
        konverzija.prikaziSliku = true;
      });

      setTimeout(() => {
        konverzija.slikaChanging = false;
      }, 2000);
    });
  }


  // Pretraga
  onFilterChanged() {
    if (this.filter) {

      // najprije gledam po nazivu tiffa 
      this.konverzijeData = [];

      for (const konverzija of this.konverzijeDataHOLD) {
        if (konverzija.tiff[0].filename.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
          || konverzija.tiff[0].originalname.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
        ) {
          this.konverzijeData.push(konverzija);
        } else {
          // ako ga nije naslo gledam u sadrzanim slikama 
          if (konverzija.slike) {
            for (let i = 0; i < konverzija.slike.length; i++) {
              let slika = konverzija.slike[i];

              if (slika.filename.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
                || slika.originalname.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
              ) {
                this.konverzijeData.push(konverzija);
                break;
              }
            }
          }


        }
      }


    } else {
      this.konverzijeData = Object.assign([], this.konverzijeDataHOLD);
    }
  }

  zatvoriTablicu(konverzija) {
    konverzija.prikaziSliku = false;
    konverzija.selectedSlika = {};
  }

  downloadTiff(konverzija) {
    if (konverzija.Blob) {
      this.download(konverzija);
    } else {
      this.getFile(konverzija, true);
    }
  }
  download(konverzija) {
    const fileName = konverzija.tiff[0].originalname;
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.target = '_blank';
    const fileURL = window.URL.createObjectURL(konverzija.Blob);
    a.href = fileURL;
    a.download = fileName;
    a.click();
  }







  getSlike() {
    const self = this;
    return new Promise(async function (resolve, reject) {
      self.slikeService.getSlike({}).subscribe(data => {
        self.slikeData = data;
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
            self.appService.prikaziToast('error', null, err.error, self.globalVar.trajanjeErrAlert, err);
          } else {
            console.log('Server-side error occured.');
            self.appService.prikaziToast('error', null, err, self.globalVar.trajanjeErrAlert, err);
          }
          resolve();
        },
        () => {
          resolve();
        });
    });
  }
  getKonverzije() {
    const self = this;
    return new Promise(async function (resolve, reject) {
      self.slikeService.getKonverzije({}).subscribe(data => {
        self.konverzijeData = data;
        self.konverzijeDataHOLD = data;
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
            self.appService.prikaziToast('error', null, err.error, self.globalVar.trajanjeErrAlert, err);
          } else {
            console.log('Server-side error occured.');
            self.appService.prikaziToast('error', null, err, self.globalVar.trajanjeErrAlert, err);
          }
          resolve();
        },
        () => {
          resolve();
        });
    });
  }







  odaberiSlike() {
    this.uploadedFiles = [];
    this.dialogHeader = this.translate.instant('Odaberi_slike');
    this.displayDialog = true;
  }

  cancel(fileUpload) {
    this.displayDialog = false;
    fileUpload.clear();
    this.selectedDoc = {};
  }

  onSelect(event) {
    for (const file of event.files) {
      var dozvoljeni = ["image/tiff", "image/jpeg", "image/bmp", "image/gif", "image/png"];
      if (dozvoljeni.includes(file.type)) {

        // želimo svakom file-u dodat njegov 'identifikator' da ga možemo brisati na remove
        file.identifier = this.docID;
        this.docID++;



        const originalFile = file as Blob;
        const reader = new FileReader();
        reader.readAsDataURL(originalFile);
        reader.onload = () => {
          file.Preview = {
            file: reader.result,
            saKlijenta: true,
            data: originalFile
          };
        };


        this.uploadedFiles.push(file);

      }

    }
  }

  // pri uklanjanju 
  onRemove(event) {
    // kad uklanjamo na x u tile-u
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      if (this.uploadedFiles[i].identifier === event.identifier) {
        this.uploadedFiles.splice(i, 1);
      }
    }
  }












  save(fileUpload) {
    let files = Object.assign([], this.uploadedFiles);
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file, file.name);
    }

    this.http.post(this.config.API_URL + 'upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);

          fileUpload.clear();
          this.uploadedFiles = [];

          this.getData();
        }
      });
  }


  getFile(konverzija, konverzijaDaNe) {
    this.appService.getFilePreview(konverzijaDaNe ? konverzija.tiff[0] : konverzija.selectedSlika).subscribe(data => {

      // ako dohvacam tiff
      if (konverzijaDaNe) {
        konverzija.Blob = data;

        this.download(konverzija);
      } else {
        konverzija.selectedSlika.Blob = data;

        this.refreshSlika(konverzija);
      }

    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
          this.appService.prikaziToast('error', null, err.error, this.globalVar.trajanjeErrAlert, err);
        } else {
          console.log('Server-side error occured.');
          this.appService.prikaziToast('error', null, err, this.globalVar.trajanjeErrAlert, err);
        }
      },
      () => {
      });
  }



}
