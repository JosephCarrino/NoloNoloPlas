import { Component, OnInit } from '@angular/core';
import { isLogged } from '../globals'
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
 
  constructor(public _router: Router) {}

  ngOnInit(): void {
  }

  public isLogged: boolean = isLogged
  public isMenuOpen: boolean = false;
}
