import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { getCategories, getCrusade } from '../utils/APIs';
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
  public isCrusade = false;

  public stateDict: any = {
    'broken': "Non disponibile",
    'suitable': "Buono",
    'good': "Ottimo",
    'perfect': "Perfetto"};


  constructor() { }

  async ngOnInit(): Promise<void> {
    this.breakpoint = (window.innerWidth <= 930) ? 2 : 4;
    this.notBreakpoint = (window.innerWidth <= 930)  ?  1 : 2;
    this.oneCol = (window.innerWidth <= 930) ? true : false;
    await this.refillArticles();
    await this.myCrusade();
  }

  ngAfterViewInit(){
    setTimeout(() => {($('.owl-carousel') as any).owlCarousel({
      loop:true,
      margin:10,
      nav:false,
      autoHeight:false,
      autoplay:true,
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
  })}, 50);
    /*setTimeout(() => {
      let dots: any = $('.owl-dot');
      let i: number = 0;
      for (let dot of dots){
        let thisInput: any = $('<input>');
        thisInput.attr("value", "Immagine numero " + i); 
        $(dot).append(thisInput);
        i++;
      }
    }, 75);*/
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

  async myCrusade() {
    let isToday= await getCrusade();
    this.isCrusade= isToday;
  }

  todayCrusade(){
    return this.isCrusade;
  }
}
