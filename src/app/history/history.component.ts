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

  stateDict: any = { 
    'pending': 'In attesa di approvazione.', 
    'approved': 'Approvato.',
    'progress': 'In corso.',
    'ended': 'Terminato.'
  }

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
      rental.state = this.stateDict[rental.state];
      rental.modState = false;
      rental.myItem.img = 'https://site202129.tw.cs.unibo.it/img/articlesImages/' + rental.myItem.img;
    }
    this.myRentals = moRent;
  }

  public modifyState(id: string){
    for(let rental of this.myRentals){
      if(rental._id == id){
        rental.modState == true;
      }
    }
  }
  public viewState(id: string){
    for(let rental of this.myRentals){
      if(rental._id == id){
        rental.modState == false;
      }
    }
  }

  public checkState(id: string){
    for(let rental of this.myRentals){
      if(rental._id == id){
        return(rental.modState);
      }
    }
  }
}
