import { Component, OnInit } from '@angular/core';
import { getRental, getArticle, patchRental } from '../utils/APIs';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-rental-modify',
  templateUrl: './rental-modify.component.html',
  styleUrls: ['./rental-modify.component.css']
})
export class RentalModifyComponent implements OnInit {
  public myRentals: any = [];

  public wrong: boolean = false;
  public inProgress: boolean = false;
  public patched: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, public datepipe: DatePipe) { }

  stateDict: any = { 
    'pending': 'In attesa di approvazione.', 
    'approved': 'Approvato.',
    'progress': 'In corso.',
    'ended': 'Terminato.'
  }

  ngOnInit(): void {
    this.refillRentals();
  }

  rentForm = this.formBuilder.group({
    date_start: '', 
    date_end:  '',
  })


  async refillRentals(){
    let myId = this.router.url.split('/');
    let res: any = await getRental(myId[myId.length - 1]);
    const rental = res.data;
    rental.myItem = await getArticle(rental.object_id);
    rental.myItem = rental.myItem.data;
    rental.date_start = rental.date_start.slice(0,10);
    rental.date_end = rental.date_end.slice(0,10);
    rental.state = this.stateDict[rental.state];
    rental.modState = false;
    rental.myItem.img = 'https://site202129.tw.cs.unibo.it/img/articlesImages/' + rental.myItem.img;
    this.myRentals.push(rental);
  }

  public async sendPatch(){
    this.inProgress = true;
    let toSend = new FormData();
    for(let field in this.rentForm.value) {
      if(this.rentForm.value[field] != ""){
        if(this.rentForm.value[field] < Date.now() || ((field == "date_end") && (this.rentForm.value["date_start"]) && (this.rentForm.value["date_start"] > this.rentForm.value[field]))){
          this.wrong= true;
          this.inProgress= false;
          return;
        } else {
          let tmp: any = new Date();
          tmp = this.datepipe.transform(this.rentForm.value[field], 'YYYY-MM-dd'); 
          toSend.append(field, tmp);
        }
      }
    }
    
    let res: boolean = await patchRental(this.myRentals[0]._id, toSend);
    //const res: boolean= false;
    this.inProgress = false;
    this.wrong = !res;
    this.patched = res;
  }

}
