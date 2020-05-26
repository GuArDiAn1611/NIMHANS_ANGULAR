import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { DataService } from '../data.service';
import { RequestService } from '../request.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  value:any;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router,private dataServ: DataService,private req:RequestService) {}

  // onSwitchMode() {
  //   this.isLoginMode = !this.isLoginMode;
  // }

  usernames: string[];
  isSelected: boolean = false;
  isAdmin: Boolean = undefined;

  ngOnInit(){
    this.req.getDoctorNames().subscribe(resData =>{
      this.usernames = resData;
    });
  }

  get(data:string) {
    this.isSelected = true;
    if (data == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    this.dataServ.doc_name=email;
    console.log(email);
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      // authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.req.checkUser().subscribe(
          user =>{
            if(user=='ROLE_ADMIN'){
              this.req.sendLog({ROLE:user,STATUS:"Login",Verified:"True"});
              this.req.addDummy().subscribe();
              this.router.navigate(['/adminTable']);
            }
            else if(user=='ROLE_DOCTOR'){
              this.req.sendLog({ROLE:user,STATUS:"Login",Verified:"True"});
              this.router.navigate(['/home']);
            }
          }
        )
        //this.dataServ.OnFetch();
      },
      errorMessage => {
        this.req.sendLog("Authorization Error : Access Denied");
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
