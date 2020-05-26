import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  value:any;
  dataset:any[];
  displayedColumns: string[] = ['sr', 'dname', 'dept', 'unit','status','edit'];
  dataSet: MatTableDataSource<any[]>;
  constructor(private req:RequestService, private router: Router, private dataServ:DataService) { }

  ngOnInit(){
    this.req.getDoctors().subscribe(posts => {
      // ...
      this.dataset=posts;
      console.log(posts);
      this.dataSet=new MatTableDataSource<any[]>(this.dataset);
      this.dataSet.paginator = this.paginator;
    });
  }

  onAdd(){
    this.dataServ.adminMode = "new";
    this.router.navigate(['/addDoc']);
  }

  onClick(el:any){
    this.dataServ.doc = el;
    this.dataServ.adminMode = "edit";
    this.router.navigate(['/addDoc']);
  }

  onChange(event:any,id:number){
    this.req.enableDisableDoc(event.checked,id).subscribe();
  }

}
