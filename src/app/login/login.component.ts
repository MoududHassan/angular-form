import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  val = {
    "email":"moudud@batworld.com",
    "password":"123456"
  }

  constructor() {


  }

  ngOnInit() {

  }

  login(loginForm:NgForm, submit){
    console.log(loginForm.value);
  }

  onEmailChange(emailValue){
    console.log(emailValue);
  }

}
