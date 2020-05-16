import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoDetailsComponent } from './demo-details/demo-details.component';
import { NeurologicalExaminationComponent } from './neurological-examination/neurological-examination.component';
import { PhysicalExaminationComponent } from './physical-examination/physical-examination.component';
import { ClinicalImpressionComponent } from './clinical-impression/clinical-impression.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeDocComponent } from './home-doc/home-doc.component';
import { ViewComponent } from './view/view.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AdminTableComponent } from './admin-table/admin-table.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeDocComponent, canActivate: [AuthGuard] },
  { path: 'view', component: ViewComponent},
  { path: 'demo', component: DemoDetailsComponent},
  { path: 'neuro', component: NeurologicalExaminationComponent },
  { path: 'phys', component: PhysicalExaminationComponent },
  { path: 'clin', component: ClinicalImpressionComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'addPat', component: AddPatientComponent },
  { path: 'adminTable', component: AdminTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
