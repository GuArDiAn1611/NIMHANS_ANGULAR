import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {

  onClick:any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  value: any;
  dataset:any[];
  displayedColumns: string[] = ['sr', 'dname', 'dept', 'unit','status'];
  dataSet: MatTableDataSource<any[]>;
  constructor() { }

  ngOnInit() {
    this.dataSet.paginator = this.paginator;
  }

}
