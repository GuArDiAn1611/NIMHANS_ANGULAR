import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { RequestService } from '../request.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import {parse, stringify} from 'flatted/esm';

@Component({
  selector: 'app-home-doc',
  templateUrl: './home-doc.component.html',
  styleUrls: ['./home-doc.component.css']
})
export class HomeDocComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataset:any[];
  displayedColumns: string[] = ['ehrId', 'pname', 'age', 'gender','View'];
  dataSet: MatTableDataSource<any[]>;
  constructor(private router:Router,private dataserv: DataService,private req:RequestService,private addPat:AddPatientComponent) {
    
   }

  ngOnInit() {
    
    this.req.getOpenEncounter().subscribe(posts => {
      // ...
      this.dataset=posts;
      console.log(posts);
      this.dataSet=new MatTableDataSource<any[]>(this.dataset);
      this.dataSet.paginator = this.paginator;
    });

    
  }

  onAdd(){
    this.router.navigate(['/addPat']);
  }

  onView(){
    this.router.navigate(['/view']);    
  }
    
  onFill(encounter){
    this.dataserv.enc_id=encounter.eid;
    this.dataserv.encounterBody=encounter;
    this.dataserv.stepArr = encounter.demo_id.data.step;
    this.dataserv.stepMode = true;
    // this.addPat.onFillSteps(parse(encounter.demo_id.data.step));
    // this.dataserv.stepSetter = parse(encounter.demo_id.data.step);
    this.dataserv.fetch.next(encounter.demo_id.data.demo);
    this.dataserv.isMode.next({editMode:true,viewMode:false});
    this.router.navigate(['/addPat']);
  }

}
