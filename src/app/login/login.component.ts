import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  
  hide = true;
  
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  getErrorMessage() {
    if (this.email.hasError('required'))  {
      return 'Inserisci un\' email';
    }

    return this.email.hasError('email') ? 'Email non valida'
  : '';
  }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("Acceduto");
  }

}
