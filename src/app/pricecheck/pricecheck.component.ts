import { Component, Input, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pricecheck',
  templateUrl: './pricecheck.component.html',
  styleUrls: ['./pricecheck.component.css']
})
export class PricecheckComponent implements OnInit {

  myArticle: any;
  newArticle: any;
  constructor(private formBuilder: FormBuilder, private router: Router, public datepipe: DatePipe, private _route: ActivatedRoute) { 
    let tmp = this.router?.getCurrentNavigation()?.extras?.state;
    if(tmp)
      this.myArticle = tmp; 
    this.myArticle.state = '';
    }

  public stateDict: any = {
    'broken': "Non disponibile",
    'suitable': "Buono",
    'good': "Ottimo",
    'perfect': "Perfetto"};


  public dateForm: FormGroup;
  public wrongDates: boolean = false;

  async ngOnInit(): Promise<void> {
    this.dateForm = this.formBuilder.group({
      date_start: ['', Validators.required],
      date_end: ['', Validators.required]
    }, {
      validator: myValidator("date_start", "date_end")
    })
  }


  newMove(event: any){
    if(event.selectedIndex == 1){
      this.checkPrice()
    }
  }

  checkDates(){
    if(this.dateForm.value['date_start'] > this.dateForm.value['date_end'])
      this.wrongDates= true;
    else
      this.wrongDates= false;
  }

  async checkPrice(){
    let tmpStart: any = new Date();
    tmpStart = this.datepipe.transform(this.dateForm.value['date_start'], 'YYYY-MM-dd'); 
    let tmpEnd: any = new Date();
    tmpEnd = this.datepipe.transform(this.dateForm.value['date_end'], 'YYYY-MM-dd'); 
    this.newArticle = this.myArticle;
    this.newArticle.start=  tmpStart;
    this.newArticle.state= '';
    this.newArticle.end= tmpEnd;
    this.newArticle.discounts = [];
    this.newArticle.max = Math.round((((this.dateForm.value['date_end'] - this.dateForm.value['date_start']) / (1000 * 60 * 60 * 24))) * this.newArticle.price);
  }
}

export const myValidator = (field1: string, field2: string): ValidatorFn => (control: AbstractControl) => {
  if(control){
    if(control.get(field1) && control.get(field2)){
      if(control?.get(field1)?.value < control?.get(field2)?.value) {
            return null;
      }
      return { myValidator: { valid: false } };
    }
  }
  return { myValidator: { valid: false } };
}
