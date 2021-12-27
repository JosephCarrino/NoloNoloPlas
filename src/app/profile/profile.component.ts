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


  public imageUrl: string = 'https://site202129.tw.cs.unibo.it/img/customersAvatar/'
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
  retrievedForm = this.formBuilder.group({
    name: '',
    surname: '',
    username: '',
    password: '',
    paymentmethod: '',
    residence:  '',
    avatar: ''
  })

  getPlace(field: string): string{
    return this.retrievedForm.value[field];
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 930) ? 3 : 4;
    this.notBreakpoint = (window.innerWidth <= 660) ? 3 : 1;
    this.imgWidth = (window.innerWidth <= 660) ? 50 : 100;
    this.oneCol = (window.innerWidth <= 930) ? true : false;
    this.refillForm();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 930) ? 3 : 4;
    this.notBreakpoint = (window.innerWidth <= 660) ? 3 : 1;
    this.imgWidth = (window.innerWidth <= 660) ? 50 : 100;
    this.oneCol = (window.innerWidth <= 930) ? true : false;
  }

  tiles: Tile[] = [
    {text: 'Data', cols: 3, rows: 2, color: 'lightblue'},
    {text: 'Propic', cols: 1, rows: 1, color: 'lightpink'}
  ];

  async refillForm(): Promise<void> {
    let res: any = await getUserInfo(getUserId());
    this.imageUrl+= res.data.avatar;
    res.data.avatar = "";
    this.retrievedForm = this.formBuilder.group(res.data);
    res.data.password = "";
    this.patchForm = this.formBuilder.group(res.data);
    this.patchForm.value['password'] = "";
    console.log(res.data);
  }

  onFileChange(event:any) {

  

    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      this.patchForm.patchValue({

        avatar: file

      });
    }

  }

  async onSubmit(): Promise<void> {
    this.inProgress = true;
    let toSend = new FormData();
    for(let field in this.patchForm.value) {
      if(this.patchForm.value[field] != ""){
        toSend.append(field, this.patchForm.value[field]);
      }
    }
    let res: boolean = await patchUser(getUserId(), toSend);
    this.inProgress = false;
    this.wrong = !res;
    this.patched = res;
  }
}
