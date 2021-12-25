import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { login, isLoggedIn } from '../utils/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public wrong: boolean = false;
  public inProgress: boolean = false;
  hide = true;
  
  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    this.wrong = false;
    this.inProgress = true;
    await login(this.loginForm.value.username, this.loginForm.value.password);
    if(isLoggedIn()){
      this.inProgress = false;
      this.router.navigate(['../']);
    } else {
      this.inProgress = false;
      this.wrong = true;
    }
  }

}
