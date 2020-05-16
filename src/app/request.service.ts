import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';
import {parse, stringify} from 'flatted/esm';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url:string='';
  constructor(private http:HttpClient,private dataServ:DataService) { }

  addDummy() {
    return this.http
         .get('http://localhost:8585/add_dummy');
         
  }

  public getDoctorNames(){
    return this.http
    .get<any[]>('http://localhost:8585/doctors/all')
    .pipe(
      map(responseData => {
        const data=[];
        for(const hello of responseData){
            data.push(hello.dname);
        }
        return data;
      })
    );
  }

  public getPatDetails(id:String){
    this.url = 'http://localhost:8585/test/getPatient/'+id;
    return this.http.get<any>(this.url).pipe(
      map(responseData => {
        this.dataServ.encounterArray=responseData.encounters;
        return responseData;
      })
    );
  }

  public OnFetch(){
    return this.http
         .get<any[]>('http://localhost:8585/patients/all')
         .pipe(
           map(responseData => {
             return responseData;
           })
         )
         
     }

     public getDid(){
      return this.http
          .get<any[]>('http://localhost:8585/doctors/all')
          .pipe(
            map(responseData => {
              return responseData;
            })
          )
    }

    public getEid(pid:number){
      return this.http
          .post<number>('http://localhost:8585/encounters',{
            patient_id:pid,
	          doctor_id:this.dataServ.emp_id
          })
          .pipe(
            map(responseData => {
              return responseData;
            })
          )
        }

    public getOpenEncounter(){
      return this.http
          .get<any[]>('http://localhost:8585/encounters/all')
          .pipe(
            map(responseData => {
              const data=[];
              for(const hello of responseData){
                if(hello.flag=="open"){
                  data.push(hello);
                }
              }
              return data;
            })
          )
    }
        
        
}
