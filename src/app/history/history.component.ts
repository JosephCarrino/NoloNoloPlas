import { Component, OnInit } from '@angular/core';
import { getUserId } from '../utils/auth';
import { getRentals, getArticle } from '../utils/APIs';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }
  public myRentals: any;
  async ngOnInit(): Promise<void> {
    await this.refillRentals();
  }

  async refillRentals(){
    let res: any = await getRentals(getUserId());
    const moRent = res.data;
    for(let rental of moRent){
      rental.myItem = await getArticle(rental.object_id);
      rental.myItem = rental.myItem.data;
      rental.date_start = rental.date_start.slice(0,10);
      rental.date_end = rental.date_end.slice(0,10);
    }
    this.myRentals = moRent;
  }
}
