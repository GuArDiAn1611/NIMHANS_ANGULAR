import {
    Component, Input, ElementRef, AfterViewInit, ViewChild
  } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { DataService } from './data.service';
import { SketchDataService } from './sketch-data.service';
  
  @Component({
    selector: 'app-canvas',
    template: '<canvas #canvas></canvas>',
    styles: ['canvas { border: 1px solid #000; }']
  })
  export class CanvasComponent implements AfterViewInit {
  
    @ViewChild('canvas',{static:false}) public canvas: ElementRef;
  
    @Input() public width = 700;
    @Input() public height = 268;   
  
    
    private cx: CanvasRenderingContext2D;

    testArray = [];
    constructor(private sketData:SketchDataService) { }
    
    public ngAfterViewInit() {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      this.cx = canvasEl.getContext('2d');
  
      canvasEl.width = this.width;
      canvasEl.height = this.height;
  
      this.cx.lineWidth = 4;
      this.cx.lineCap = 'round';
      this.cx.strokeStyle = '#000';
  
      this.captureEvents(canvasEl);
    }

    
    public captureEvents(canvasEl: HTMLCanvasElement) {
      // this will capture all mousedown events from the canvas element
      if(this.sketData.str=='headS'){
        this.testArray = this.sketData.headS;
      }
      else if(this.sketData.str=='ori'){
        this.testArray = this.sketData.oriS;
      }
      else if(this.sketData.str=='mp'){
        this.testArray = this.sketData.mpS;
      }
      else if(this.sketData.str=='ch'){
        this.testArray = this.sketData.chS;
      }
      else if(this.sketData.str=='cd'){
        this.testArray = this.sketData.cdS;
      }
      else if(this.sketData.str=='loc'){
        this.testArray = this.sketData.locS;
      }
      else if(this.sketData.str=='vom'){
        this.testArray = this.sketData.vomS;
      }
      else if(this.sketData.str=='amn'){
        this.testArray = this.sketData.amnS;
      }
      else if(this.sketData.str=='seiz'){
        this.testArray = this.sketData.seizS;
      }
      else if(this.sketData.str=='bfe'){
        this.testArray = this.sketData.bfeS;
      }
      else if(this.sketData.str=='bfn'){
        this.testArray = this.sketData.bfnS;
      }
      else if(this.sketData.str=='ori'){
        this.testArray = this.sketData.oriS;
      }
      else if(this.sketData.str=='hft'){
        this.testArray = this.sketData.hft;
      }
      else if(this.sketData.str=='se'){
        this.testArray = this.sketData.se;
      }
      else if(this.sketData.str=='gcs'){
        this.testArray = this.sketData.gcs;
      }
      for (let obj of this.testArray){
        this.drawOnCanvas(obj.prevPos, obj.currentPos);
      }
      fromEvent(canvasEl, 'mousedown')
        .pipe(
          switchMap((e) => {
            // after a mouse down, we'll record all mouse moves
            return fromEvent(canvasEl, 'mousemove')
              .pipe(
                // we'll stop (and unsubscribe) once the user releases the mouse
                // this will trigger a 'mouseup' event    
                takeUntil(fromEvent(canvasEl, 'mouseup')),
                // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
                takeUntil(fromEvent(canvasEl, 'mouseleave')),
                // pairwise lets us get the previous value to draw a line from
                // the previous point to the current point    
                pairwise()
              )
          })
        )
        .subscribe((res: [MouseEvent, MouseEvent]) => {
          const rect = canvasEl.getBoundingClientRect();
    
          // previous and current position with the offset
          const prevPos = {
            x: res[0].clientX - rect.left,
            y: res[0].clientY - rect.top
          };
    
          const currentPos = {
            x: res[1].clientX - rect.left,
            y: res[1].clientY - rect.top
          };
    
          // this method we'll implement soon to do the actual drawing
          
          this.drawOnCanvas(prevPos, currentPos);
          console.log(prevPos,currentPos);
          if(this.sketData.str=='headS'){
            this.sketData.headS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=="ori"){
            this.sketData.oriS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=="mp"){
            this.sketData.mpS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=="ch"){
            this.sketData.chS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=="cd"){
            this.sketData.cdS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=='loc'){
            this.sketData.locS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=='vom'){
            this.sketData.vomS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=='amn'){
            this.sketData.amnS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=='seiz'){
            this.sketData.seizS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=='bfe'){
            this.sketData.bfeS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=='bfn'){
            this.sketData.bfnS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=='ori'){
            this.sketData.oriS.push({prevPos,currentPos});
          }
          else if(this.sketData.str=='hft'){
            this.sketData.hft.push({prevPos,currentPos});
          }
          else if(this.sketData.str=='se'){
            this.sketData.se.push({prevPos,currentPos});
          }
          else if(this.sketData.str=='gcs'){
            this.sketData.gcs.push({prevPos,currentPos});
          }
        });
    }
  
    public drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
      if (!this.cx) { return; }
  
      this.cx.beginPath();
  
      if (prevPos) {
        this.cx.moveTo(prevPos.x, prevPos.y); // from
        this.cx.lineTo(currentPos.x, currentPos.y);
        this.cx.stroke();
      }
    }
  
  }
  