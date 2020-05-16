import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-rec',
  templateUrl: './home-rec.component.html',
  styleUrls: ['./home-rec.component.css']
})
export class HomeRecComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  onAdd(){
    this.router.navigate(['/demo']);
  }

}
