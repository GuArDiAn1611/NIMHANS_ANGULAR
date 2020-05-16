import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataset:any[];
  displayedColumns: string[] = ['ehrId', 'pname', 'age', 'gender','View'];
  dataSet: MatTableDataSource<any[]>;
  constructor(private dataserv:DataService,private router:Router,private req:RequestService) { 
    // this.dataset=this.dataserv.getData();
    // console.log(this.dataset);
  }
  
  ngOnInit() {
    this.req.OnFetch().subscribe(posts => {
      // ...
      this.dataset=posts;
      console.log(posts);
      this.dataSet=new MatTableDataSource<any[]>(this.dataset);
      this.dataSet.paginator = this.paginator;
    });
  }
  

  onClick(e){
    console.log(e);
    this.dataserv.fillMode=true;
    this.dataserv.element=e;
    this.dataserv.fetch.next(e);
    this.req.getEid(e.ehrId).subscribe(
      resData => {
        console.log(resData);
        this.dataserv.enc_id=resData;
      }
    );
    this.router.navigate(['/addPat']);
  }
  
}
