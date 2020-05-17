import { Component, OnInit, ViewChild, OnChanges, OnDestroy, QueryList } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatStepper, MatStep } from '@angular/material/stepper';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { RequestService } from '../request.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { timingSafeEqual } from 'crypto';
import {parse, stringify} from 'flatted/esm';


@Component({
  selector: 'app-demo-details',
  templateUrl: './demo-details.component.html',
  styleUrls: ['./demo-details.component.css']
})
export class DemoDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) signupForm: NgForm;
  // @ViewChild('helmet', { static: false }) checkHelmet:MatSlideToggle;
  // @ViewChild('alcohol', { static: false }) checkAlcohol:MatSlideToggle;
  value: any;
  genders=['male','female'];
  isView =false;
  postUrl:string;
  mode: Array<any> = [
    { name: 'Eyewitness', value: 'Eyewitness' },
    { name: 'Hearsay', value: 'Hearsay' }
  ];
  type: Array<any> = [
    { name: 'RTA', value: 'RTA' },
    { name: 'Fall', value: 'Fall' },
    { name: 'Assault', value: 'Assault' },
    { name: 'Other', value: 'Other' }
  ];
  role: Array<any> = [
    { name: 'Driver', value: 'Driver' },
    { name: 'Passenger', value: 'Passenger' },
    { name: 'Pedestrian', value: 'Pedestrian' }
  ];
  helmet=['Yes','No'];
  alcohol=['Yes','No'];

  user : {
    demo: {
      ehrId: number,
      pname: '',
      age: number,
      gender: '',
      pcontact:''
    },
    dte: '',
    iname: '',
    dti: '',
    poi:'',
    helmet: false,
    alcohol: false,
    a_mode:"",
    a_type:"",
    a_role:""
    step:number[]
  };
  submitted = false;
  form: FormGroup;
  meraForm:FormGroup;
  saveDemo = this.dataserv.saveDemo.subscribe(valued =>{
    if(valued){
      this.onSubmit();
    }
  });

  constructor(private _bottomSheet: MatBottomSheet, private fb: FormBuilder,private http: HttpClient,private dataserv:DataService,private router:Router,private addPat:AddPatientComponent,private req:RequestService) {
    this.form = this.fb.group({
      modeArray: this.fb.array([],[Validators.required]),
      typeArray: this.fb.array([],[Validators.required]),
      roleArray: this.fb.array([],[Validators.required])
    })
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  } 

  onGenderChange({ value }: MatButtonToggleChange) {
    this.user.demo.gender = value;
  }

  onRoleChange({ value }: MatButtonToggleChange) {
    this.user.a_role = value;
  }

  onTypeChange({ value }: MatButtonToggleChange) {
    this.user.a_type = value;
  }

  onModeChange({ value }: MatButtonToggleChange) {
    this.user.a_mode = value;
  }

  viewDemo = this.dataserv.isMode.subscribe(valued =>{
    this.isView=valued.viewMode;
    if(valued.viewMode || valued.editMode){
      this.dataserv.element = this.dataserv.encounterBody.demo_id.data.demo;
      this.user=this.dataserv.encounterBody.demo_id.data;
      // this.addPat.step._steps=parse(this.dataserv.encounterBody.demo_id.data.step);

    }
    else{
      this.user = {
        demo: {
          ehrId: null,
          pname: '',
          age: null,
          gender: '',
          pcontact:''
        },
        dte: '',
        iname: '',
        dti: '',
        poi:'',
        helmet: false,
        alcohol: false,
        a_mode:"",
        a_type:"",
        a_role:"",
        step:[]
      };
      this.user.demo = this.dataserv.element;
    }
  });

  ngOnInit() {
    if(this.dataserv.fillMode==true){
      this.user.demo=this.dataserv.element;
      this.user.demo.ehrId = this.dataserv.element.ehrid_uhid.demo.uh_id;
      this.dataserv.fillMode=false;
    }
    // else{
    //   this.user.demo.ehrId=null;
    //   this.user.demo.pname='';
    //   this.user.demo.age=null;
    //   this.user.demo.pcontact='';
    //   this.user.demo.gender='';
    // }
  }

  ngOnDestroy() {
    this.saveDemo.unsubscribe();
    this.viewDemo.unsubscribe();
  }
  
  onEnter(id:HTMLInputElement){
    this.req.getPatDetails(id.value).subscribe(resData => {
      this.user.demo.pname = resData.pname;
      this.user.demo.age = resData.age;
      this.user.demo.pcontact=resData.pcontact;
      this.user.demo.gender=resData.gender;
      this.dataserv.fetch.next(this.user.demo);
      this.req.getEid(resData.ehrId).subscribe(
        num => {
          this.dataserv.enc_id=num;
          this.postUrl='http://localhost:8585/encounters/demographic/'+this.dataserv.enc_id;
          this.http.post(this.postUrl,this.user).subscribe();
        }
      );
    });
  }
  goBack(){
    this.addPat.goBack();
  }
  goNext(){
    this.addPat.goNext();
  }
  // onCreatePost(postData: { uhid: string; name: string; age: string; dte: string; gender: string; iname: string; dti: string; helmet: string; alcohol: string; a_mode: string[]; a_type: string[]; a_role: string[]; }) {
  //   // Send Http request
  //   this.http
  //     .post(
  //       'https://nimhans-476a7.firebaseio.com/demo_details.json',
  //       postData
  //     )
  //     .subscribe(responseData => {
  //       console.log(responseData);
  //     });
  // }
  onSubmit() {
    this.postUrl='http://localhost:8585/encounters/demographic/'+this.dataserv.enc_id;
    this.submitted = true;
    this.user.step[0]=this.addPat.step.selectedIndex+1;
    if(this.addPat.step1.interacted){
      this.user.step.push(1);
    }
    if(this.addPat.step2.interacted){
      this.user.step.push(2);
    }
    if(this.addPat.step3.interacted){
      this.user.step.push(3);
    }
    if(this.addPat.step4.interacted){
      this.user.step.push(4);
    }
    // this.user.ehrId = this.signupForm.value.uhid;
    // this.user.pname = this.signupForm.value.name;
    // this.user.age = this.signupForm.value.age;
    // this.user.gender = this.signupForm.value.gender;
    // this.user.dte = this.signupForm.value.dte;
    // this.user.iname = this.signupForm.value.iname;
    // this.user.dti = this.signupForm.value.dti;
    // this.user.poi = this.signupForm.value.poi;
    // if(this.checkHelmet.checked){
    //   this.user.helmet = "Yes";
    // }
    // else{
    //   this.user.helmet = "No";
    // }
    // if(this.checkAlcohol.checked){
    //   this.user.alcohol = "Yes";
    // }
    // else{
    //   this.user.alcohol = "No";
    // }
    // this.onCreatePost(this.user);
    console.log(this.user);
    // this.user.step=this.addPat.step._steps;
    this.dataserv.fillMode=false;
    this.http
          .post(this.postUrl,this.user)
          .subscribe(_value => {
            console.log("yaaaaa");
            this.dataserv.saveDemo.next(false);
            this.dataserv.savePhys.next(true);
          });
    // this.signupForm.reset();
    // this.dataserv.fetch.next(null);
  }
 
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheet implements OnInit {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,private dataServ:DataService,private router:Router) {}
  ngOnInit(): void {
    this.arr=this.dataServ.encounterArray;
  }
  arr=[];
  openLink(encounter:any): void {
    this.dataServ.encounterBody=encounter;
    this.dataServ.isMode.next({editMode:false,viewMode:true});
    this._bottomSheetRef.dismiss();
  }
}

