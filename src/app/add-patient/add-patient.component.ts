import { Component, OnInit, ViewChild, OnDestroy, Injectable, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { MatStepper, MatStepHeader, MatStep } from '@angular/material/stepper';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AddPatientComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('stepper',{static:false}) step:MatStepper;
  @ViewChild('step1',{static:false}) step1:MatStep;
  @ViewChild('step2',{static:false}) step2:MatStep;
  @ViewChild('step3',{static:false}) step3:MatStep;
  @ViewChild('step4',{static:false}) step4:MatStep;
  value:any;
  str:string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,private dataServ:DataService,private req:RequestService) { }
  onDemo(){
    this.str='phys';
  }

  listener = this.dataServ.isExitClick.subscribe(value=>{
    if(value){
      this.step.selectedIndex = 0;
      this.step2.interacted = false;
      this.step3.interacted = false;
      this.step4.interacted = false;
    }
  });

  goBack(){
    this.step.previous();
    // console.log(this.dataServ.stepSetter);
    // console.log(this.step._steps);
    // this.step._steps = this.dataServ.stepArr;
}

// onFillSteps(data){
//   this.step._steps = data;
// }

  goNext(){
    this.step.next();
    
    // this.dataServ.stepArr=this.step._steps;
}

ngAfterViewInit(){
  setTimeout(()=>{
  if(this.dataServ.stepMode){
      this.step.selectedIndex = this.dataServ.stepArr[0] - 1;
      for (const i of this.dataServ.stepArr){
        if(i==1){
          this.step1.completed=true;
        }
        else if(i==2){
          this.step2.completed=true;
        }
        else if(i==3){
          this.step3.completed=true;
        }
        else if(i==4){
          this.step4.completed=true;
        }
      }
    }
    this.dataServ.stepMode = false;
  });

} 
 
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    
    this.req.getDid().subscribe(
      resData => {
        console.log(resData);
        for(const hello of resData){
          if(hello.dname===this.dataServ.doc_name){
            this.dataServ.emp_id=hello.emp_id;
          }
        }
      }
    );
    
    this.dataServ.isTrue.next(true);
  }
  ngOnDestroy(){
    this.dataServ.isTrue.next(false);
    this.listener.unsubscribe();
  }
}
