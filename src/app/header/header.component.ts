import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isView=false;
  isAuthenticated = false;
  name='';
  age=null;
  gender='';
  private userSub: Subscription;
  private edit: Subscription;
  private fetch: Subscription;
  private saveExit : Subscription;
 
  view = this.dataServ.isMode.subscribe(value =>{
    this.isView=value.viewMode;
  })

  isEditMode:boolean=false;
  constructor(
    private authService: AuthService, private dataServ:DataService,private router:Router,private addPat: AddPatientComponent
  ) {}


  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
    this.edit = this.dataServ.isTrue.subscribe(value =>{
      this.isEditMode=value;
    });
    this.fetch = this.dataServ.fetch.subscribe(elem => {
      this.name = elem.pname;
      this.age=elem.age;
      this.gender=elem.gender;
    });
  }

  // ngOnChanges(){
  //   this.isEditMode=this.dataServ.isTrue;
  // }

  onExitView(){
    this.dataServ.viewEnd = true;
    this.dataServ.isMode.next({editMode:false,viewMode:false});
    this.router.navigate(['/addPat']);
    this.dataServ.isExitClick.next(true);
    this.dataServ.isExitClick.next(false);

  }
  onSave(){
    // this.dataServ.stepArr = this.addPat.step._steps;
    this.dataServ.saveDemo.next(true);
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.edit.unsubscribe();
    this.fetch.unsubscribe();
    this.view.unsubscribe();
  }
}