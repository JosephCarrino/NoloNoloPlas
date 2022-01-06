import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { getArticle, checkAvailability, createRental } from '../utils/APIs';
import { getUserId } from '../utils/auth';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  public dateForm: FormGroup;
  public wrongDates: boolean = false;
  public myArticle: any;
  public articleName: string;
  public newArticle: any = {};
  public notAvailable: boolean = false;
  public avalForm: FormGroup;
  public rentalCreated: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, public datepipe: DatePipe) { }

  public stateDict: any = {
    'broken': "Non disponibile",
    'suitable': "Buono",
    'good': "Ottimo",
    'perfect': "Perfetto"};

    newStateDict: any = { 
      'pending': 'In attesa di approvazione.', 
      'approved': 'Approvato.',
      'progress': 'In corso.',
      'ended': 'Terminato.',
      'delayed': 'In ritardo.',
      'deleted': 'Cancellato.'
    }

  async ngOnInit(): Promise<void> {
    this.dateForm = this.formBuilder.group({
      date_start: ['', Validators.required],
      date_end: ['', Validators.required]
    }, {
      validator: myValidator("date_start", "date_end")
    })
    this.avalForm = this.formBuilder.group({
      aval: this.notAvailable
    }, {
      validator: myValidatorStepTwo("aval")
    })
    await this.refillArticle();
    this.articleName = this.myArticle.name;
  }

  async refillArticle(){
    this.myArticle = await getArticle(this.getId());
    this.myArticle = this.myArticle.data;
    this.myArticle.img = 'https://site202129.tw.cs.unibo.it/img/articlesImages/' + this.myArticle.img;
    this.myArticle.translated = this.stateDict[this.myArticle.state];
    return this.myArticle;
  }

  
  getId(){
    let tmp: any = this.router.url;
    tmp = tmp.split('/');
    return tmp[tmp.length - 1];
  }
  
  checkDates(){
    if(this.dateForm.value['date_start'] > this.dateForm.value['date_end'])
      this.wrongDates= true;
    else
      this.wrongDates= false;
  }

  newMove(event: any){
    if(event.selectedIndex == 1){
      this.checkPrice()
    } else if(event.selectedIndex == 2){
      this.postRental();
    }
  }

  async postRental(){
    let toSend: any = {}
    toSend['userId']= await getUserId();
    toSend['object_id']= this.getId();
    toSend['date_start']= this.datepipe.transform(this.dateForm.value['date_start'], 'YYYY-MM-dd');
    toSend['date_end']= this.datepipe.transform(this.dateForm.value['date_end'], 'YYYY-MM-dd');
    toSend['state']= 'pending';
    this.rentalCreated = await createRental(toSend);

  }

  async checkPrice(){
    let tmpStart: any = new Date();
    tmpStart = this.datepipe.transform(this.dateForm.value['date_start'], 'YYYY-MM-dd'); 
    let tmpEnd: any = new Date();
    tmpEnd = this.datepipe.transform(this.dateForm.value['date_end'], 'YYYY-MM-dd'); 
    let infos = await checkAvailability(this.getId(), tmpStart, tmpEnd);
    if(infos.available){
      this.notAvailable= false;
      this.avalForm.patchValue({aval: false})
      for(let field in this.myArticle){
        this.newArticle[field]= this.myArticle[field];
      }
      let newSum= []
      for(let sum of infos.estimated.summary){
        sum = sum.replace('(', ' (')
        for(let eng in this.stateDict){
          sum = sum.replace(eng, this.stateDict[eng]);
        }
        newSum.push(sum);
      }
      this.newArticle.final= infos.estimated.price;
      this.newArticle.discounts= newSum;
      this.newArticle.start=  tmpStart;
      this.newArticle.end= tmpEnd;
      this.newArticle.fakePrice = Math.round((((this.dateForm.value['date_end'] - this.dateForm.value['date_start']) / (1000 * 60 * 60 * 24))) * this.newArticle.price);
   } else{
     this.newArticle = {}
      this.notAvailable= true;
      this.avalForm.patchValue({aval: true})
   }
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

export const myValidatorStepTwo = (notContinue: string): ValidatorFn => (control: AbstractControl) => {
  if(control){
    if(control.get(notContinue)){
      if(!(control?.get(notContinue)?.value)){
        return null;
      }
    }
    return { myValidatorStepTwo: { valid: false } };
  }
  return { myValidatorStepTwo: { valid: false } };
}