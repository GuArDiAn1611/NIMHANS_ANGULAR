import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SketchDataService {
  canvas: ElementRef;
  str:string='';
  headS=[];
  oriS=[];
  mpS=[];
  chS=[];
  cdS=[];
  gcs=[];
  locS=[];
  vomS=[];
  liS=[];
  amnS=[];
  seizS=[];
  bfeS=[];
  bfnS=[];
  hft=[];
  se=[];
  constructor() { }
}
