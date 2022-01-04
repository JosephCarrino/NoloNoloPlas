import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { isLoggedIn } from '../utils/auth';
import { addPreferences, removePreferences } from '../utils/APIs';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: any;
  @Input() newPage: boolean;
  @Input() tryRent: boolean;
  @Input() subs: boolean;
  @Input() userId: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  myNav(){
    this.router.navigate(['checkprice'], { state: this.article });
  }

  mylog(){
    return isLoggedIn();
  }

  async addPref(toAdd: string){
    let toSend = toAdd
    const response = await addPreferences(this.userId, toSend)
    if(response)
      this.article.favorite= true;
  }

  async removePref(toRemove: string){
    let toSend = toRemove
    const response = await removePreferences(this.userId, toSend)
    if(response)
      this.article.favorite= false;
  }
}
