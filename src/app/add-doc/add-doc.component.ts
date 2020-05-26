import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.css']
})
export class AddDocComponent implements OnInit {

  constructor(private dataServ:DataService, private req: RequestService, private router: Router) { }
  value:any;

  doc = {
    emp_id:null,
    dname:"",
    dcontact:"",
    demail:"",
    daddress:"",
    department:"",
    unit:null
  }

  addUser = {
    username:"",
    password:"",
    role:"ROLE_DOCTOR"
  }
  ngOnInit() {
    if(this.dataServ.adminMode=='edit'){
      this.doc = this.dataServ.doc;
    }
  }

  onExit(){
    this.router.navigate(['/adminTable']);
  }
  
  onSubmit(){
    if(this.dataServ.adminMode=='edit'){
      this.req.updatePassword(this.doc.emp_id,this.addUser.password).subscribe();
      this.dataServ.adminMode="";
      this.router.navigate(['/adminTable']);
    }
    else{
    this.addUser.username = this.doc.dname;
    this.dataServ.doc = this.doc;
    console.log(this.doc);
    this.dataServ.addUser = this.addUser;
    this.req.addDoctor();
    }
  }
}
