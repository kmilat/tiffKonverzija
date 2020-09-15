
import { Injectable } from '@angular/core';
import { GlobalVar } from '../globalVar';
import { TranslateService } from '@ngx-translate/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Message, MessageService } from 'primeng/api';
import { DateFormatPipe } from 'angular2-moment';
import { Config } from '../config';
import { retry, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private messageService: MessageService,
    private globalVar: GlobalVar,
    private dfp: DateFormatPipe,
    private translate: TranslateService,
    private http: HttpClient,
    public config: Config,
  ) { }

  // prikaz ikonice za status
  public SetImageOnBoleanField(params) {
    let imageElement;
    if (params.value === true || params.value === 1) {
      imageElement = '<image src="assets/images/active.png" style="height:20px; margin-top: 3px">';
    } else {
      imageElement = '<image src="assets/images/inactive.png" style="height:20px; margin-top: 3px" >';
    }
    return imageElement;
  }

  public handleError<T>(operacija) {
    return (error: any): Observable<T> => {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('3 Komponenta/funkcija greške:', operacija);
        console.error('4 Klijentska/mrežna greška ', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error('5 Komponenta/funkcija greške:', operacija);
        console.error('6 Serverska greška ', error.message);
      }
      // return an observable with a user-facing error message
      // ako je povrat sa servera vracam poruku koju je srver pripremio, inace pisem http error
      let returnErrMsg;
      if (error.status === 0) {
        returnErrMsg = 'SERVERNEDOSTUPAN';
      } else if (error.error.message) {
        if (error.error.message.length > 0) {
          returnErrMsg = error.error.message;
        } else {
          returnErrMsg = error.name + ': ' + error.statusText;
        }
      } else if (error.error.error) {
        if (error.error.error.length > 0) {
          returnErrMsg = error.error.error;
        } else {
          returnErrMsg = error.name + ': ' + error.statusText;
        }
      }

      return throwError(
        {
          message: returnErrMsg,
          status: error.status
        }
      );
    };
  }

  public prikaziToast(severity, summary, detail, life, err?) {
    if (!err) {
      err = {};
    }

    if (err.status === 0) {
      this.messageService.add({ severity: severity, summary: summary, detail: this.translate.instant('SERVERNEDOSTUPAN'), life: life });
    } else {
      let textDetail;
      if (detail.message) {
        textDetail = detail.message;
      } else {
        textDetail = detail;
      }

      this.messageService.add({ severity: severity, summary: summary, detail: textDetail, life: life });
    }

  }


  public extensionCellRenderer(params) {

    function checkAudioTypes(ext) {
      const audioTypes = [
        'aif',
        'cda',
        'mid',
        'midi',
        'mp3',
        'mpa',
        'ogg',
        'wav',
        'wma',
        'wpl'
      ];
      return audioTypes.includes(ext);
    }

    function checkCompressedTypes(ext) {
      const compressedTypes = [
        '7z',
        'arj',
        'deb',
        'pkg',
        'rar',
        'rpm',
        'z',
        'zip'
      ];
      return compressedTypes.includes(ext);
    }

    function checkDiscMediaTypes(ext) {
      const discMediaTypes = [
        'bin',
        'dmg',
        'iso',
        'toast',
        'vcd',
      ];
      return discMediaTypes.includes(ext);
    }

    function checkDataDatabaseTypes(ext) {
      const dataDatabaseTypes = [
        'csv',
        'dat',
        'db',
        'dbf',
        'log',
        'mdb',
        'sav',
        'sql',
        'tar',
        'xml'
      ];
      return dataDatabaseTypes.includes(ext);
    }

    function checkExecutableTypes(ext) {
      const executableTypes = [
        'apk',
        'bat',
        'bin',
        'cgi',
        'pl',
        'com',
        'exe',
        'gadget',
        'jar',
        'py',
        'wsf'
      ];
      return executableTypes.includes(ext);
    }

    function checkFontTypes(ext) {
      const fontTypes = [
        'fnt',
        'fon',
        'otf',
        'ttf'
      ];
      return fontTypes.includes(ext);
    }

    function checkImageTypes(ext) {
      const ImageTypes = [
        'ai',
        'bmp',
        'gif',
        'ico',
        'jpeg',
        'jpg',
        'png',
        'ps',
        'psd',
        'svg',
        'tif',
        'tiff'
      ];
      return ImageTypes.includes(ext);
    }

    function checkPresentationTypes(ext) {
      const PresentationTypes = [
        'key',
        'odp',
        'pps',
        'ppt',
        'pptx'
      ];
      return PresentationTypes.includes(ext);
    }

    function checkProgrammingTypes(ext) {
      const ProgrammingTypes = [
        'c',
        'class',
        'cpp',
        'cs',
        'h',
        'java',
        'sh',
        'swift',
        'vb'
      ];
      return ProgrammingTypes.includes(ext);
    }

    function checkSpreadsheetTypes(ext) {
      const SpreadsheetTypes = [
        'ods',
        'xlr',
        'xls',
        'xlsx'
      ];
      return SpreadsheetTypes.includes(ext);
    }

    function checkSystemTypes(ext) {
      const SystemTypes = [
        'bak',
        'cab',
        'cfg',
        'cpl',
        'cur',
        'dll',
        'dmp',
        'drv',
        'icns',
        'ico',
        'ini',
        'lnk',
        'msi',
        'sys',
        'tmp'
      ];
      return SystemTypes.includes(ext);
    }

    function checkVideoTypes(ext) {
      const VideoTypes = [
        '3g2',
        '3gp',
        'avi',
        'flv',
        'h264',
        'm4v',
        'mkv',
        'mov',
        'mp4',
        'mpg',
        'mpeg',
        'rm',
        'swf',
        'vob',
        'wmv'
      ];
      return VideoTypes.includes(ext);
    }

    function checkTextTypes(ext) {
      const TextTypes = [
        'doc',
        'docx',
        'odt',
        'pdf',
        'rtf',
        'tex',
        'txt',
        'wks',
        'wps',
        'wpd'
      ];
      return TextTypes.includes(ext);
    }

    let cellContent = '';
    let imagePath;
    let index;
    let fileType;

    try {
      let originalname;
      // ako pozivam iz grida ima params.data, ako iz pregleda klasifikacije dobijem samo originalname
      if (params && params.data) {
        originalname = params.data.izvorniOriginalname ? params.data.izvorniOriginalname : params.data.name;
      } else {
        originalname = params;
      }

      if (originalname) {
        index = originalname.lastIndexOf('.');
        fileType = (originalname.substring(index + 1, originalname.length)).toLowerCase();

        // najprije najucestalije
        if (fileType === 'pdf') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'doc') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'docx') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'odt') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'txt') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'mp4') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'mpg' || fileType === 'mpeg') {
          imagePath = 'assets/img/fileExt/mpg.png';
        } else if (fileType === 'xls') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'xlsx') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'ppt') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'jpeg' || fileType === 'jpg') {
          imagePath = 'assets/img/fileExt/jpg.png';
        } else if (fileType === 'png') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'xml') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'mp3') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'wav') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
        } else if (fileType === 'wma') {
          imagePath = 'assets/img/fileExt/' + fileType + '.png';
          // ako nije ni jedna od gore navedenih provjeravam postoji li u ostalim listama i stavljam opceniti img za svaku grupu
        } else if (checkAudioTypes(fileType)) {
          imagePath = 'assets/img/fileExt/sound-file.png';
        } else if (checkCompressedTypes(fileType)) {
          imagePath = 'assets/img/fileExt/zip.png';
        } else if (checkDiscMediaTypes(fileType)) {
          imagePath = 'assets/img/fileExt/data-storage.png';
        } else if (checkDataDatabaseTypes(fileType)) {
          imagePath = 'assets/img/fileExt/database.png';
        } else if (checkExecutableTypes(fileType)) {
          imagePath = 'assets/img/fileExt/exe.png';
        } else if (checkFontTypes(fileType)) {
          imagePath = 'assets/img/fileExt/font.png';
        } else if (checkImageTypes(fileType)) {
          imagePath = 'assets/img/fileExt/pictures.png';
        } else if (checkPresentationTypes(fileType)) {
          imagePath = 'assets/img/fileExt/presentation.png';
        } else if (checkProgrammingTypes(fileType)) {
          imagePath = 'assets/img/fileExt/code.png';
        } else if (checkSpreadsheetTypes(fileType)) {
          imagePath = 'assets/img/fileExt/spreadsheet.png';
        } else if (checkSystemTypes(fileType)) {
          imagePath = 'assets/img/fileExt/system.png';
        } else if (checkVideoTypes(fileType)) {
          imagePath = 'assets/img/fileExt/video-file.png';
        } else if (checkTextTypes(fileType)) {
          imagePath = 'assets/img/fileExt/word.png';
        } else {
          imagePath = 'assets/img/fileExt/file.png';
        }

        cellContent += '<image src="' +
          imagePath + '" title="' + fileType + '" style="margin-top: -6px"></a> &nbsp;';

      }


    } catch (exception) {

    }

    if (params && params.data) {
      return cellContent;
    } else {
      return imagePath ? imagePath : 'assets/img/fileExt/file.png';
    }
  }


  // FORMATIRANJE DATUMA I VREMENA DD.MM.YYYY. HH:mm:ss
  public formatDateTime(UnFormatedDate) {
    let dateFormat;
    if (UnFormatedDate != null) {
      const datePipe = new DatePipe('en-EN');
      dateFormat = datePipe.transform(UnFormatedDate, 'dd.MM.yyyy. HH:mm:ss');
      return dateFormat;
    }
    return null;
  }











  getFilePreview(data) {
    return this.http.get(encodeURI(this.config.API_URL + 'download'), {
      responseType: 'blob' as 'json',
      params: data
    })
      .pipe(
        retry(0),
        catchError(this.handleError('AppService.getFile'))
      );
    //    return this.http.request(new HttpRequest(
    //         'GET',
    //         `${this.config.API_URL + 'download'}?file=${data.file}`,
    //         null,
    //         {
    //           reportProgress: true,
    //           responseType: 'blob'
    //         }));
  }
  //   public downloadFile(file: string): Observable<HttpEvent<Blob>> {
  //       return this.httpClient.request(new HttpRequest(
  //         'GET',
  //         `${this.apiDownloadUrl}?file=${file}`,
  //         null,
  //         {
  //           reportProgress: true,
  //           responseType: 'blob'
  //         }));
  //     }




}
