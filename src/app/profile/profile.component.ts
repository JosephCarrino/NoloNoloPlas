import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { getUserId } from '../utils/auth';
import { getUserInfo, patchUser } from '../utils/APIs';

interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public wrong: boolean = false;
  public inProgress: boolean = false;
  public patched: boolean = false;
  oneCol: boolean = false;
  imgWidth: number= 100;
  notBreakpoint: number = 1;
  breakpoint: number = 4;
  hide: boolean = true;
  patchForm = this.formBuilder.group({
    name: '',
    surname: '',
    username: '',
    password: '',
    paymentmethod: '',
    residence:  '',
    avatar: ''
  })
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 660) ? 3 : 4;
    this.notBreakpoint = (window.innerWidth <= 660) ? 3 : 1;
    this.imgWidth = (window.innerWidth <= 660) ? 50 : 100;
    this.oneCol = (window.innerWidth <= 886) ? true : false;
    this.refillForm();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 660) ? 3 : 4;
    this.notBreakpoint = (window.innerWidth <= 660) ? 3 : 1;
    this.imgWidth = (window.innerWidth <= 660) ? 50 : 100;
    this.oneCol = (window.innerWidth <= 886) ? true : false;
  }

  tiles: Tile[] = [
    {text: 'Data', cols: 3, rows: 2, color: 'lightblue'},
    {text: 'Propic', cols: 1, rows: 1, color: 'lightpink'}
  ];

  async refillForm(): Promise<void> {
    let res: any = await getUserInfo(getUserId());
    this.patchForm = this.formBuilder.group(res.data);
  }

  async onSubmit(): Promise<void> {
    this.inProgress = true;
    let toSend: any = this.patchForm.value;
    toSend['id'] = getUserId();
    let res: boolean = await patchUser(getUserId(), toSend);
    this.inProgress = false;
    this.wrong = !res;
    this.patched = res;
  }
}
