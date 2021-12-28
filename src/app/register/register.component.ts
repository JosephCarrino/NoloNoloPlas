import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { register, getPayment } from '../utils/APIs';
import { Router } from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public wrong: boolean = false;
  public inProgress: boolean = false;
  public registered: boolean = false;
  public payments: any = [];

  hide = true;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.refillPayment();
  }

  regForm = this.formBuilder.group({
    name: '',
    surname: '',
    username: '',
    password: '',
    paymentmethod: '',
    residence:  '',
    avatar: ''
  })


  async refillPayment(): Promise<void> {
    let res: any = await getPayment();
    this.payments = res;
  }
  

  onFileChange(event:any) {

  

    if (event.target.files.length > 0) {

      const file = event.target.files[0];
      this.regForm.patchValue({

        avatar: file

      });
    }

  }

  async onSubmit(): Promise<void> {
    this.wrong = false;
    this.inProgress = true;
    let toSend = new FormData();
    for(let field in this.regForm.value) {
      if(this.regForm.value[field] != "")
        toSend.append(field, this.regForm.value[field]);
    }
    let didReg: boolean = await register(toSend);
    if(didReg){
      this.registered = true;
      setTimeout(() => {this.inProgress = false; this.router.navigate(['/login'])}, 5000)
    } else {
      this.inProgress = false;
      this.wrong = true;
    }
  }
}
