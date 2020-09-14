import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicDialogModule, DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GlobalVar } from './globalVar';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Config } from './config';
import { DateFormatPipe } from 'angular2-moment';
// ----- TRANSLATE ----------------------------------------------------------
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeHr from '@angular/common/locales/hr';

// AG-GRID
import { AgGridModule } from 'ag-grid-angular';


// PRIMENG
import { TableModule } from 'primeng/table';
import { PickListModule } from 'primeng/picklist';
import { MenubarModule } from 'primeng/menubar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InplaceModule } from 'primeng/inplace';
import { ToastModule } from 'primeng/toast';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';
import { OrderListModule } from 'primeng/orderlist';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DragDropModule } from 'primeng/dragdrop';
import { TreeModule } from 'primeng/tree';
import { TabMenuModule } from 'primeng/tabmenu';
import { MessageService } from 'primeng';
import { CardModule, } from 'primeng/card';


import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PasswordModule } from 'primeng/password';
import { CopyClipboardModule } from './_directives/copy-clipboard.module';
import { RedirectComponent } from './RedirectComponent';
import { AppHttpInterceptor } from './_rest/appHttpInterceptor';
import { SlikeComponent } from './slike/slike.component';
import { ImgPreviewComponent } from './img-preview/img-preview.component';




// KONFIGURACIJA

registerLocaleData(localeHr);

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RedirectComponent,
    SlikeComponent,
    ImgPreviewComponent
  ],
  entryComponents: [
  ],
  imports: [
    AgGridModule.withComponents([]
    ),
    BrowserModule,
    TableModule,
    PickListModule,
    AppRoutingModule,
    MenubarModule,
    SelectButtonModule,
    KeyFilterModule,
    SliderModule,
    TabViewModule,
    CardModule,
    PdfViewerModule,
    CalendarModule,
    ToolbarModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    AutoCompleteModule,
    InplaceModule,
    ToastModule,
    VirtualScrollerModule,
    BrowserAnimationsModule,
    ListboxModule,
    CheckboxModule,
    DynamicDialogModule,
    OrderListModule,
    DropdownModule,
    FormsModule,
    InputTextareaModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    PasswordModule,
    DragDropModule,
    TreeModule,
    TabMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CopyClipboardModule
  ],
  providers: [GlobalVar,
    MessageService,
    DialogService,
    NgxNavigationWithDataComponent,
    DynamicDialogConfig,
    DynamicDialogRef,
    Config,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    DateFormatPipe
  ],

  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
