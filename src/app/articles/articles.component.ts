import { Component, OnInit } from '@angular/core';
import { getArticles } from '../utils/APIs';
import { FormBuilder } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
  value: string;
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class ArticlesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  public stateDict: any = {
    'broken': "Non disponibile",
    'suitable': "Buono",
    'good': "Ottimo",
    'perfect': "Perfetto"};



    queriesForm = this.formBuilder.group({
      priceLow: 0,
      priceHigh: 9999999,
      sortBy: '',
      perfect: false,
      good: false,
      suitable: false,
      broken: false
    })


  public oneCol: boolean = false;
  public myArticles: any = [];
  public filteredState: any = [];
  public filteredCateg: any = [];
  public myArticlesFiltered: any = [];



  ngOnInit(): void {
    this.oneCol = (window.innerWidth <= 930) ? true : false;
    this.refillArticles();
    this.myArticlesFiltered = this.myArticles;

  }

  onResize(event: any) {
    this.oneCol = (window.innerWidth <= 930) ? true : false;
  }



  task: Task = {
    name: 'Tutti gli stati',
    value: 'all',
    completed: true,
    color: 'primary',
    subtasks: [],
  };

  categories: Task = {
    name: 'Tutte le categorie',
    value: 'all',
    completed: true,
    color: 'primary',
    subtasks: [],
  };



  async refillStates(articles: any){
    let stateFound: any = [];
    for(let article of articles){
      if(!stateFound.includes(article.state)){
        stateFound.push(article.state);
      }
    }
    for(let state of stateFound){
      let currTask: Task = {'name': this.stateDict[state], 'value': state, 'completed': true, 'color': 'primary'};
      if(this.task){
        if (this.task.subtasks){
          this.queriesForm.patchValue({state: true});
          this.task.subtasks.push(currTask);
        }
      }
    }
  }

  async refillCategories(articles: any){
    let stateFound: any = [];
    for(let article of articles){
      if(!stateFound.includes(article.category)){
        stateFound.push(article.category);
      }
    }
    for(let state of stateFound){
      let currTask: Task = {'name': state, 'value': state, 'completed': true, 'color': 'primary'};
      if(this.categories){
        if (this.categories.subtasks){
          this.categories.subtasks.push(currTask);
        }
      }
    }
  }

  async refillArticles(){
    let response: any = await getArticles();
    for (let article of response){
      article.img = 'https://site202129.tw.cs.unibo.it/img/articlesImages/' + article.img;
      article.translated = this.stateDict[article.state];
    }
    this.myArticlesFiltered = response;
    this.myArticles = response;
    await this.refillStates(this.myArticles);
    await this.refillCategories(this.myArticles);
  }


  allComplete: boolean = true;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  onUpdateAllComplete(){
    this.updateAllComplete();
    this.filterByState();
  }

  onSomeComplete(): boolean {
    let toRet: boolean = this.someComplete();
    this.filterByState();
    return toRet
  }

  onAllChange(completed: boolean) {
    this.setAll(completed);
    this.filterByState();
  }

  filterByState(){
    let temp = [];
    for(let filter in this.queriesForm.value){
      if(filter != "priceHigh" && filter !=  "priceLow" && filter != "sortBy"){
        if(this.queriesForm.value[filter])
          temp.push(filter);
      }
    }
    this.filteredState = temp;
    let tmpArticles = this.myArticlesFiltered;
    this.myArticlesFiltered= []
    for(let article of this.myArticles){
      if(this.filteredState.includes(article.state)){
        this.myArticlesFiltered.push(article)
      }
    }
    this.sortByPrice();
  }

  filterByCategory(){
    let temp = [];
    if(this.categories.subtasks){
    for(let i= 0; i < this.categories.subtasks.length; i++){ 
      let myElem: any = document.getElementById(this.categories.subtasks[i].name);
      if(myElem.getAttribute('checked'))    
        temp.push(this.categories.subtasks[i].name);
    }
    this.filteredCateg = temp;
    let tmpArticles = this.myArticlesFiltered;
    this.myArticlesFiltered= []
    console.log(this.filteredCateg)
    for(let article of tmpArticles){
      if(this.filteredCateg.includes(article.category)){
        this.myArticlesFiltered.push(article)
      }
    }
    this.sortByPrice();
    }
  }

  sortByPrice(){
    if(this.queriesForm.value['sortBy'] != ''){
      const mul = this.queriesForm.value['sortBy'] === 'higherPrice' ? 1 : -1
      this.myArticlesFiltered.sort( (a: any,b: any) => {
        if(a.price < b.price) return mul
        else if(a.price > b.price) return -mul
        else return 0
      })
    }
  }


}
