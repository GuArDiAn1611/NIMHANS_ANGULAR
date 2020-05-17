import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, Input, Inject } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CanvasComponent } from '../canvas.component';
import { SketchDataService } from '../sketch-data.service';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-clinical-impression',
  templateUrl: './clinical-impression.component.html',
  styleUrls: ['./clinical-impression.component.css']
})
export class ClinicalImpressionComponent implements OnInit,OnDestroy {

  animal: string;
  name: string;
  value: any;

  @ViewChild('fl', { static: false }) cli_det: NgForm;
  // @ViewChild('headS', { static: false }) headS: ElementRef;
  // @ViewChild('oriS', { static: false }) oriS: ElementRef;
  // @ViewChild('mpS', { static: false }) mpS: ElementRef;
  // @ViewChild('chS', { static: false }) chS: ElementRef;
  // @ViewChild('cdS', { static: false }) cdS: ElementRef;
  isView=false;
  // cts:boolean=false;
  // ori:boolean=false;
  // mp:boolean=false;
  // ch:boolean=false;
  // cd:boolean=false;
  postUrl:string;
  finishUrl:string;
  getUrl:string;
  user = {
    gcs:'',
    head:'',
    ori:'',
    mp:'',
    ch:'',
    cd:'',
    headS:[],
    oriS:[],
    mpS:[],
    chS:[],
    cdS:[]
  };
  gcs=['Yes','No'];
  constructor(private dataServ:DataService,private http: HttpClient,private sketData:SketchDataService,private router:Router,public dialog: MatDialog) { }
  
  openDialog(str:string): void {
    this.sketData.str=str;
    const dialogRef = this.dialog.open(DialogOverviewClinDialog, {
      width: '750px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  

  

  onGcsChange({ value }: MatButtonToggleChange) {
    this.user.gcs = value;
  }

  saveClin = this.dataServ.saveClin.subscribe(value =>{
    if(value){
      this.onSaveExit();
    }
  });

  viewClin = this.dataServ.isMode.subscribe(valued =>{
    this.isView=valued.viewMode;
    if(valued.viewMode || valued.editMode){
      this.user=this.dataServ.encounterBody.clinical_id.data;
      this.sketData.headS=this.user.headS;
      this.sketData.oriS=this.user.oriS;
      this.sketData.mpS=this.user.mpS;
      this.sketData.chS=this.user.chS;
      this.sketData.cdS=this.user.cdS;
    }
    else{
      this.user = {
        gcs:'',
        head:'',
        ori:'',
        mp:'',
        ch:'',
        cd:'',
        headS:[],
        oriS:[],
        mpS:[],
        chS:[],
        cdS:[]
      };
      this.sketData.headS=this.user.headS;
      this.sketData.oriS=this.user.oriS;
      this.sketData.mpS=this.user.mpS;
      this.sketData.chS=this.user.chS;
      this.sketData.cdS=this.user.cdS;
    }
  }); 

  ngOnInit() {
    // if(this.dataServ.isViewMode){
    //   this.user=this.dataServ.encounterBody.clinical_id.data;
    // }
  }

  ngOnDestroy(){
    this.viewClin.unsubscribe();
    this.saveClin.unsubscribe();
  }
  // onCtsT(){
  //   this.cts=false;
  // }
  // onCtsS(){
  //   this.cts=true;
  //   this.sketData.str="head";
  // }
  // onOriT(){
  //   this.ori=false;
  // }

  // onOriS(){
  //   this.ori=true;
  //   this.sketData.str="ori";
  // }
  // onMpT(){
  //   this.mp=false;
  // }
  // onMpS(){
  //   this.mp=true;
  //   this.sketData.str="mp";
  // }
  // onChT(){
  //   this.ch=false;
  // }
  // onChS(){
  //   this.ch=true;
  //   this.sketData.str="ch";
  // }
  // onCdT(){
  //   this.cd=false;
  // }
  // onCdS(){
  //   this.cd=true;
  //   this.sketData.str="cd";
  // }
  onSaveExit(){
    this.postUrl='http://localhost:8585/encounters/clinical/'+this.dataServ.enc_id;
    this.finishUrl='http://localhost:8585/encounters/finish/'+this.dataServ.enc_id;
    this.getUrl='http://localhost:8585/encounters/'+this.dataServ.enc_id;
    // this.user.head=this.cli_det.value.head;
    // this.user.ori=this.cli_det.value.ori;
    // this.user.mp=this.cli_det.value.mp;
    // this.user.ch=this.cli_det.value.ch;
    // this.user.cd=this.cli_det.value.cd;
    this.user.headS=this.sketData.headS;
    this.user.cdS=this.sketData.cdS;
    this.user.chS=this.sketData.chS;
    this.user.oriS=this.sketData.oriS;
    this.user.mpS=this.sketData.mpS;
    this.http.post(this.postUrl,this.user).subscribe(_value =>{
      this.dataServ.isMode.next({editMode:false,viewMode:false});
      this.dataServ.saveClin.next(false);
      this.router.navigate(['/home']);
    });
  }

  onSubmit(){
    // this.dataServ.saveExit.next(true);
    this.postUrl='http://localhost:8585/encounters/clinical/'+this.dataServ.enc_id;
    this.finishUrl='http://localhost:8585/encounters/finish/'+this.dataServ.enc_id;
    this.getUrl='http://localhost:8585/encounters/'+this.dataServ.enc_id;
    this.dataServ.onSend();
    this.http.post(this.finishUrl,"any").subscribe(() =>{
                console.log("finish kr diya");
                this.http.get(this.getUrl).subscribe(resData =>{
                  console.log(resData);
                });
              });       
    // this.http
    //       .get(this.getUrl)
    //       .subscribe(
    //         resData =>{
    //           console.log(resData);
    //         }
    //       );
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewClinDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewClinDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dataService : DataService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(){
    // console.log(this.dataService.dataArray);
  }

}
