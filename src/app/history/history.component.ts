import { Component, OnInit } from '@angular/core';
import { getUserId } from '../utils/auth';
import { getRentals, getArticle, delRental } from '../utils/APIs';
import { Router, NavigationStart } from '@angular/router';
import * as myGlobals from '../globals';
import {ThemePalette} from '@angular/material/core';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { DialogContentDeleteComponent } from '../dialog-content-delete/dialog-content-delete.component';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
  value: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class HistoryComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, public dialog: MatDialog) { }

  stateDict: any = { 
    'pending': 'In attesa di approvazione.', 
    'approved': 'Approvato.',
    'progress': 'In corso.',
    'ended': 'Terminato.'
  }

  public oneCol: boolean = false;
  public wrong: boolean = false;
  public myRentals: any;
  async ngOnInit(): Promise<void> {
    this.oneCol = (window.innerWidth <= 930) ? true : false;
    await this.refillRentals({});
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart){
        let myid= event.url.split('/');
        let mystate: string= ''; 
        for(let rental of this.myRentals){
          if(rental._id == myid[myid.length - 1]){
            mystate= rental.state;
          }
        }
        myGlobals.setState(mystate);       
      }
    })
  }

  onResize(event: any) {
    this.oneCol = (window.innerWidth <= 930) ? true : false;
  }

  queriesForm = this.formBuilder.group({
    pending: true,
    approved: true,
    started: true,
    ended: true,
    date_start: '',
    date_end: ''
  })

  async refillRentals(queries: any){
    let res: any = await getRentals(getUserId(), queries);
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

  task: Task = {
    name: 'Tutti gli stati',
    value: 'all',
    completed: true,
    color: 'primary',
    subtasks: [
      {name: 'In attesa di approvazione', value: 'pending', completed: true, color: 'primary'},
      {name: 'Approvati', value: 'approved', completed: true, color: 'accent'},
      {name: 'Iniziati', value: 'started', completed: true, color: 'warn'},
      {name: 'Conclusi', value: 'ended', completed: true, color: 'accent'},
    ],
  };

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

  public onSubmitQuery(){
    let toSend: any = {}
    let all: boolean = true;
    for(let field in this.queriesForm.value){
      if(field == "pending" || field == "approved" || field == "started" || field == "ended")
        if(!this.queriesForm.value[field])
          all= false;
    }
    for(let field in this.queriesForm.value){
      if(this.queriesForm.value[field]){
        if((field == "pending" || field == "approved" || field == "started" || field == "ended")){
          if(!all)
            toSend[field] = this.queriesForm.value[field];
        } else {
          toSend[field] = this.queriesForm.value[field];
        }
      }
    }
    let newToSend: any = {}
      newToSend.state = '';
      for(let state in toSend){
        if(state != "date_start" && state != "date_end"){
          newToSend.state+= state + ','
        }
        else{
          let tmp: any = new Date();
          tmp = this.datePipe.transform(toSend[state], 'YYYY-MM-dd'); 
          newToSend[state]= tmp.toString();
        }
    }
    if(newToSend.state != '')
      newToSend.state = newToSend.state.slice(0, newToSend.state.length-1)
    if(newToSend.date_start && newToSend.date_end)
      if(Date.parse(newToSend.date_end) > Date.parse(newToSend.date_start)){
        this.wrong= false;
        this.refillRentals(newToSend);
      }
      else{
        this.wrong= true;
      }
    else
      this.refillRentals(newToSend);
  }

  public deleteRental(id: string){
    const dialogRef = this.dialog.open(DialogContentDeleteComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        await delRental(id)
        this.redirectTo('/history')
      }
    });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
 
}
