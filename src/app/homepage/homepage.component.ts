import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel

  breakpoint: number = 4;
  notBreakpoint: number = 3;

  constructor() { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 930) ? 2 : 4;
    this.notBreakpoint = (window.innerWidth <= 930)  ?  1 : 2;
  }

  ngAfterViewInit(){
    ($('.owl-carousel') as any).owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoHeight:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
  }

  onResize(event: any) {
    this.breakpoint = (window.innerWidth <= 930) ? 2 : 4;
    this.notBreakpoint = (window.innerWidth <= 930)  ?  1 : 2;
  }

}
