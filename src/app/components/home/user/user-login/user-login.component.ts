import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
userLoginForm:FormGroup;

constructor(private fb:FormBuilder){
  this.userLoginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  })
}

get email():AbstractControl<any,any>| null{
  return this.userLoginForm.get('email');
}

get password():AbstractControl<any,any>| null{
  return this.userLoginForm.get('password');

  }

  onSubmit():void{}
}
