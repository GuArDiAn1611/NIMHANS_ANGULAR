import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DemoDetailsComponent, BottomSheetOverviewExampleSheet } from './demo-details/demo-details.component';
import { PhysicalExaminationComponent, DialogOverviewPhysDialog } from './physical-examination/physical-examination.component';
import { NeurologicalExaminationComponent, DialogOverviewNeuroDialog } from './neurological-examination/neurological-examination.component';
import { ClinicalImpressionComponent, DialogOverviewClinDialog } from './clinical-impression/clinical-impression.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeDocComponent } from './home-doc/home-doc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ViewComponent } from './view/view.component';
import { MatSliderModule } from '@angular/material/slider';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DemoMaterialModule } from './material-module';
import { MatNativeDateModule } from '@angular/material/core';
import { CanvasComponent } from './canvas.component';
import { MatDialogModule } from '@angular/material';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { AddDocComponent } from './add-doc/add-doc.component';
// import { GlobalErrorHandler } from './core/global-error-handler/global-error-handler.service';
import { TellaComponent } from './tella/tella.component';

@NgModule({
  entryComponents: [BottomSheetOverviewExampleSheet, ClinicalImpressionComponent, DialogOverviewClinDialog, NeurologicalExaminationComponent, DialogOverviewNeuroDialog,PhysicalExaminationComponent, DialogOverviewPhysDialog],
  declarations: [
    AppComponent,
    HeaderComponent,
    DemoDetailsComponent,
    PhysicalExaminationComponent,
    NeurologicalExaminationComponent,
    ClinicalImpressionComponent,
    HomeDocComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    ViewComponent,
    AddPatientComponent,
    CanvasComponent,
    BottomSheetOverviewExampleSheet,
    DialogOverviewClinDialog,
    DialogOverviewNeuroDialog,
    DialogOverviewPhysDialog,
    AdminTableComponent,
    AddDocComponent,
    TellaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    DemoMaterialModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler
    // }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
