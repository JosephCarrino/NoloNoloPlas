import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { isLoggedIn } from '../utils/auth';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
 
  constructor(public _router: Router, public cd: ChangeDetectorRef, private ref: ApplicationRef) {}

  ngOnInit(): void {}

  mylog() {
    return isLoggedIn();
  }

  logout(): void{
    localStorage.clear();
  }

  toManager(): void{
    window.location.href = 'https://site202129.tw.cs.unibo.it/dashboard'
  }

  toEmployee(): void{
    window.location.href = 'https://site202129.tw.cs.unibo.it/staff'
  }

  public isMenuOpen: boolean = false;
}
