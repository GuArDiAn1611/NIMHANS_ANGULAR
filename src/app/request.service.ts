import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';
import {parse, stringify} from 'flatted/esm';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url:string='';
  constructor(private http:HttpClient,private dataServ:DataService, private router: Router) { }

  public sendLog(data:any){
    this.http.post<any>('http://localhost:3336',data).subscribe();
  }

  addDummy() {
    return this.http
         .get('http://localhost:8585/add_dummy');
         
  }

  public checkUser(){
    return this.http.get<any>('http://localhost:8585/current')
    .pipe(
      map( resData =>{
        return resData.authorities[0].authority;
      })
    );
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
    console.log(this.url);
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

    public addDoctor(){
      this.http
      .post<number>('http://localhost:8585/doctors',this.dataServ.doc).subscribe(
        id => {
          this.url = 'http://localhost:8585/users/'+id;
          console.log(this.url);
          this.http.post<any>(this.url,this.dataServ.addUser).subscribe(
            () =>{
            this.router.navigate(['/adminTable']);
            }
          );
        }
      )
    }

    public getDoctors(){
      return this.http
          .get<any[]>('http://localhost:8585/users/all')
          .pipe(
            map(responseData => {
              const data=[];
              for(const hello of responseData){
                if(hello.id>6){
                  data.push(hello);
                }
              }
              return data;
            })
          ) 
    }

    public updatePassword(id:number,pwd:string){
      this.url = 'http://localhost:8585/users/update/'+id;
      return this.http.post<any>(this.url,pwd);
    }

    public enableDisableDoc(val:boolean,id:number){
      if(val){
        this.url = 'http://localhost:8585/users/update/enable/'+id;
        return this.http.post<any>(this.url,null);
      }
      else{
        this.url = 'http://localhost:8585/users/update/disable/'+id;
        return this.http.post<any>(this.url,null);
      }
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
