import { Injectable, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatStepper, MatStep } from '@angular/material/stepper';
import { BehaviorSubject } from 'rxjs';


export interface patient {
  ehrId:number,
  pname:'',
  pcontact:'',
  age:number,
  gender:'',
  ehrid_uhid:{
    demo:{
      uh_id:number
    }
  }
}

export interface mode{
  editMode:boolean,
  viewMode:boolean
}
//   emp_id: number;
//   dname: string;
//   dcontact: string;
//   demail: string;
//   daddress: string;
//   patient: {}[];
// }

@Injectable({
  providedIn: 'root'
})
export class DataService {
  element:patient ={
    ehrId:null,
    pname:'',
    pcontact:'',
    age:null,
    gender:'',
    ehrid_uhid:{
      demo:{
        uh_id:null
      }
    }
  }
  isMode=new BehaviorSubject<mode>({editMode:false,viewMode:false});
  encounterBody:any;
  encounterArray=[];
  stepMode:boolean;
  stepArr:number[];
  viewEnd = false;
  isExitClick = new BehaviorSubject<boolean>(false);
  isTrue = new BehaviorSubject<boolean>(false);
  fetch=new BehaviorSubject<any>(this.element);
  saveDemo = new BehaviorSubject<boolean>(null);
  savePhys = new BehaviorSubject<boolean>(null);
  saveNuer = new BehaviorSubject<boolean>(null);
  saveClin = new BehaviorSubject<boolean>(null);
  // stepSetter:QueryList<MatStep>;
  doc_name:string='';
  emp_id:number=1;
  enc_id:number;
  fillMode=false;
  LoadedData=[];

  onSend(){
    this.saveDemo.next(true);
  }
 
  constructor() { }


}
