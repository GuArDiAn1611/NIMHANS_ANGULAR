import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SketchDataService } from '../sketch-data.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-physical-examination',
  templateUrl: './physical-examination.component.html',
  styleUrls: ['./physical-examination.component.css']
})
export class PhysicalExaminationComponent implements OnInit, OnDestroy {

  animal: string;
  name: string; 
  value: any;

  @ViewChild('f', { static: false }) phy_det: NgForm;
  @ViewChild('loc', { static: false }) loc:MatSlideToggle;
  @ViewChild('vom', { static: false }) vom:MatSlideToggle;
  @ViewChild('li', { static: false }) li:MatSlideToggle;
  @ViewChild('amn', { static: false }) amn:MatSlideToggle;
  @ViewChild('seiz', { static: false }) seiz:MatSlideToggle;
  @ViewChild('bfe', { static: false }) bfe:MatSlideToggle;
  @ViewChild('bfn', { static: false }) bfn:MatSlideToggle;
  @ViewChild('apb', { static: false }) apb:MatSlideToggle;
  @ViewChild('ci', { static: false }) ci:MatSlideToggle;
  @ViewChild('frac', { static: false }) frac:MatSlideToggle;
  @ViewChild('ai', { static: false }) ai:MatSlideToggle;
  @ViewChild('pp', { static: false }) pp:MatSlideToggle;
  @ViewChild('wnd', { static: false }) wnd:MatSlideToggle;
  @ViewChild('st', { static: false }) st:MatSlideToggle;
  @ViewChild('sd', { static: false }) sd:MatSlideToggle;

  pulse1=0;
  pulse2=0;
  bps1=0;
  bps2=0;
  bpd1=0;
  bpd2=0;
  aoas=['Clear','Requires Intubation'];
  srs=['Normal','Tachypnoeic','Gasping'];
  cps=['Left','Right'];
  types=['Rhinorrhoea','Otorrhoea','Both'];
  slide_num_1 = [0,10,20,30,40,50,60,70,80];
  slide_num_2 = [90,100,110,120,130,140,150,160,170,180,190,200];
  slide_num_3 = [0,1,2,3,4,5,6,7,8,9,10];

  postUrl:string;
  isView =false;
  savePhys = this.dataServ.savePhys.subscribe(value =>{
    if(value){
      this.onSubmit();
    }
  });

  user = {
    loc: false,
    vom: false,
    li: false,
    amn: false,
    seiz: false,
    bfe: false,
    bfn: false,
    locS:[],
    vomS:[],
    liS:[],
    amnS:[],
    seizS:[],
    bfeS:[],
    bfnS:[],
    aoa: '',
    sr: '',
    cp:'',
    pr:0,
    pulse1:0,
    pulse2:0,
    bps:0,
    bps1:0,
    bps2:0,
    bpd:0,
    bpd1:0,
    bpd2:0,
    type:'',
    apb:false,
    ci:false,
    frac:false,
    ai:false,
    pp:false,
    wnd:false,
    st:false,
    sd:false,
    hft:[],
    se:[]
  };
  constructor(private dataServ:DataService,private http: HttpClient,private addPat:AddPatientComponent,private sketData:SketchDataService,public dialog: MatDialog) {}

  openDialog(str:string): void {
    this.sketData.str=str;
    const dialogRef = this.dialog.open(DialogOverviewPhysDialog, {
      width: '750px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  onAoaChange({ value }: MatButtonToggleChange) {
    this.user.aoa = value;
  }

  onSrChange({ value }: MatButtonToggleChange) {
    this.user.sr = value;
  }

  onCpChange({ value }: MatButtonToggleChange) {
    this.user.cp = value;
  }

  onTypeChange({ value }: MatButtonToggleChange) {
    this.user.type = value;
  }

  viewPhys = this.dataServ.isMode.subscribe(valued =>{
    this.isView=valued.viewMode;
    if(valued.viewMode || valued.editMode){
      this.user=this.dataServ.encounterBody.physical_id.data;
      this.sketData.locS = this.user.locS;
      this.sketData.vomS = this.user.vomS;
      this.sketData.liS = this.user.liS;
      this.sketData.amnS = this.user.amnS;
      this.sketData.seizS = this.user.seizS;
      this.sketData.bfeS = this.user.bfeS;
      this.sketData.bfnS = this.user.bfnS;
      this.sketData.hft = this.user.hft;
      this.sketData.se = this.user.se;
    }
    else{
      this.user = {
        loc: false,
        vom: false,
        li: false,
        amn: false,
        seiz: false,
        bfe: false,
        bfn: false,
        locS:[],
        vomS:[],
        liS:[],
        amnS:[],
        seizS:[],
        bfeS:[],
        bfnS:[],
        aoa: '',
        sr: '',
        cp:'',
        pr:0,
        pulse1:0,
        pulse2:0,
        bps:0,
        bps1:0,
        bps2:0,
        bpd:0,
        bpd1:0,
        bpd2:0,
        type:'',
        apb:false,
        ci:false,
        frac:false,
        ai:false,
        pp:false,
        wnd:false,
        st:false,
        sd:false,
        hft:[],
        se:[]
      };
      this.sketData.locS = this.user.locS;
      this.sketData.vomS = this.user.vomS;
      this.sketData.liS = this.user.liS;
      this.sketData.amnS = this.user.amnS;
      this.sketData.seizS = this.user.seizS;
      this.sketData.bfeS = this.user.bfeS;
      this.sketData.bfnS = this.user.bfnS;
      this.sketData.hft = this.user.hft;
      this.sketData.se = this.user.se;
    }
  });

  ngOnInit() {
    // if(this.dataServ.isViewMode){
    //   this.user=this.dataServ.encounterBody.physical_id.data;
    // }
    console.log(this.dataServ.emp_id);
  }

  ngOnDestroy() {
    this.savePhys.unsubscribe();
    this.viewPhys.unsubscribe();
  }

  goBack(){
    this.addPat.goBack();
  }
  goNext(){
    this.addPat.goNext();
  }

  onSubmit(){
    this.postUrl='http://localhost:8585/encounters/physical/'+this.dataServ.enc_id;
    this.user.pr=this.user.pulse1 + this.user.pulse2;
    this.user.bps=this.user.bps1 + this.user.bps2;
    this.user.bpd=this.user.bpd1 + this.user.bpd2;
    this.user.locS=this.sketData.locS;
    this.user.vomS=this.sketData.vomS;
    this.user.liS=this.sketData.liS;
    this.user.amnS=this.sketData.amnS;
    this.user.seizS=this.sketData.seizS;
    this.user.bfeS=this.sketData.bfeS;
    this.user.bfnS=this.sketData.bfnS;
    this.user.hft=this.sketData.hft;
    this.user.se=this.sketData.se;
    console.log(this.user);
    this.http
          .post(this.postUrl,this.user)
          .subscribe(_value =>{
            this.dataServ.savePhys.next(false);
            this.dataServ.saveNuer.next(true);
          });
  }
    

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewPhysDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewPhysDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dataService : DataService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(){
    // console.log(this.dataService.dataArray);
  }

}
