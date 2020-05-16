import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SketchDataService } from '../sketch-data.service';

export interface DialogData {
  animal: string;
  name: string;
} 

@Component({
  selector: 'app-neurological-examination',
  templateUrl: './neurological-examination.component.html',
  styleUrls: ['./neurological-examination.component.css']
})
export class NeurologicalExaminationComponent implements OnInit,OnDestroy {

  animal: string;
  name: string; 

  @ViewChild('f', { static: false }) Nue_det: NgForm;
  postUrl:string;
  isView =false;
  isInitial=true;
  saveNuer = this.dataServ.saveNuer.subscribe(value =>{
    if(value){
      this.onSubmit();
    }
  });
  user = {
    eosi: '',
    eosa: '',
    mrsi: '',
    mrsa: '',
    rsi: '',
    rsa: '',
    horr: '',
    horl: '',
    plrr: '',
    plrl:'',
    toneur:'',
    toneul:'',
    powerur:'',
    powerul:'',
    tonelr:'',
    tonell:'',
    powerlr:'',
    powerll:'',
    nd:'',
    gcs:[]
  };

  eos=[1,2,3,4];
  mrs=[1,2,3,4,5,6];
  rs=[1,2,3,4,5];
  hor=['Present','Absent','Not Tested'];
  plr=['Normal','Sluggish','Absent','Cannot Access'];
  constructor(private dataServ:DataService,private http: HttpClient,private addPat:AddPatientComponent,private sketData:SketchDataService,public dialog: MatDialog) { }

  openDialog(str:string): void {
    this.sketData.str=str;
    const dialogRef = this.dialog.open(DialogOverviewNeuroDialog, {
      width: '750px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  onInitial(){
    this.isInitial=true;
  }

  onAfter(){
    this.isInitial=false;
  }

  onEosiChange({ value }: MatButtonToggleChange) {
    this.user.eosi = value;
  }

  onEosaChange({ value }: MatButtonToggleChange) {
    this.user.eosa = value;
  }

  onMrsiChange({ value }: MatButtonToggleChange) {
    this.user.mrsi = value;
  }

  onMrsaChange({ value }: MatButtonToggleChange) {
    this.user.mrsa = value;
  }

  onRsiChange({ value }: MatButtonToggleChange) {
    this.user.rsi = value;
  }

  onRsaChange({ value }: MatButtonToggleChange) {
    this.user.rsa = value;
  }

  onHorrChange({ value }: MatButtonToggleChange) {
    this.user.horr = value;
  }

  onHorlChange({ value }: MatButtonToggleChange) {
    this.user.horl = value;
  }

  onPlrrChange({ value }: MatButtonToggleChange) {
    this.user.plrr = value;
  }

  onPlrlChange({ value }: MatButtonToggleChange) {
    this.user.plrl = value;
  }

  viewNeur = this.dataServ.isMode.subscribe(valued =>{
    this.isView=valued.viewMode;
    if(valued.viewMode || valued.editMode){
      this.user=this.dataServ.encounterBody.neurological_id.data;
      this.sketData.gcs=this.user.gcs;
    }
    else{
      this.user = {
        eosi: '',
        eosa: '',
        mrsi: '',
        mrsa: '',
        rsi: '',
        rsa: '',
        horr: '',
        horl: '',
        plrr: '',
        plrl:'',
        toneur:'',
        toneul:'',
        powerur:'',
        powerul:'',
        tonelr:'',
        tonell:'',
        powerlr:'',
        powerll:'',
        nd:'',
        gcs:[]
      };
      this.sketData.gcs=this.user.gcs;
    }
  });

  ngOnInit() {
    // if(this.dataServ.isViewMode){
    //   this.user=this.dataServ.encounterBody.neurological_id.data;
    // }
  }

  ngOnDestroy() {
    this.saveNuer.unsubscribe();
    this.viewNeur.unsubscribe();
  }

  goBack(){
    this.addPat.goBack();
  }
  goNext(){
    this.addPat.goNext();
  }

  onSubmit(){
    this.postUrl='http://localhost:8585/encounters/neurological/'+this.dataServ.enc_id;
    console.log("yahan aaya");
    this.user.toneur=this.Nue_det.value.toneur;
    this.user.toneul=this.Nue_det.value.toneul;
    this.user.powerur=this.Nue_det.value.powerur;
    this.user.powerul=this.Nue_det.value.powerul;
    this.user.tonelr=this.Nue_det.value.tonelr;
    this.user.tonell=this.Nue_det.value.tonell;
    this.user.powerlr=this.Nue_det.value.powerlr;
    this.user.powerll=this.Nue_det.value.powerll;
    this.user.nd=this.Nue_det.value.nd;
    this.user.gcs = this.sketData.gcs;
    console.log(this.user);
    this.http
          .post(this.postUrl,this.user)
          .subscribe(_value =>{
            this.dataServ.saveNuer.next(false);
            this.dataServ.saveClin.next(true);
          });
  }
  
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewNeuroDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewNeuroDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dataService : DataService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(){
    // console.log(this.dataService.dataArray);
  }

}
