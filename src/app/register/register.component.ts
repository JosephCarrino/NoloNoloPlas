import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { register } from '../utils/auth';
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

  hide = true;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
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

  onFileChange(event:any) {

  

    if (event.target.files.length > 0) {

      const file = event.target.files.item(0);
      this.regForm.patchValue({

        avatar: file

      });
    }

  }

  async onSubmit(): Promise<void> {
    this.wrong = false;
    this.inProgress = true;
    let didReg: boolean = await register(this.regForm.value);
    if(didReg){
      this.registered = true;
      setTimeout(() => {this.inProgress = false; this.router.navigate(['/login'])}, 5000)
    } else {
      this.inProgress = false;
      this.wrong = true;
    }
  }
}
