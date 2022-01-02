import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { getCategories } from '../utils/APIs';
import { isLoggedIn } from '../utils/auth';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel

  breakpoint: number = 4;
  notBreakpoint: number = 3;
  public myArticlesFiltered: any = [];
  oneCol: boolean = false;


  public stateDict: any = {
    'broken': "Non disponibile",
    'suitable': "Buono",
    'good': "Ottimo",
    'perfect': "Perfetto"};


  constructor() { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 930) ? 2 : 4;
    this.notBreakpoint = (window.innerWidth <= 930)  ?  1 : 2;
    this.oneCol = (window.innerWidth <= 930) ? true : false;
    this.refillArticles();
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
    this.oneCol = (window.innerWidth <= 930) ? true : false;
  }


  async refillArticles(){
    let response: any = await getCategories();
    for (let article of response){
      article.img = 'https://site202129.tw.cs.unibo.it/img/articlesImages/' + article.img;
      article.translated = this.stateDict[article.state];
    }
    this.myArticlesFiltered = response;
  }

  mylog() {
    return isLoggedIn();
  }

}
