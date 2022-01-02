import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: any;
  @Input() newPage: boolean;
  @Input() tryRent: boolean;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  myNav(){
    this.router.navigate(['checkprice'], { state: this.article });
  }
}
