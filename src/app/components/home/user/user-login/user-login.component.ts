import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginToken } from '../../types/user.type';
import { UserService } from '../services/user.service';
import { NgClass } from '@angular/common';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule, RouterLink,NgClass],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
userLoginForm:FormGroup;
alertType:number=0; //0: no alert, 1: success, 2: error
alertMessage:string='';

constructor(private fb:FormBuilder,private userService:UserService,private location:Location){
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

  onSubmit():void{
    if(this.userLoginForm.invalid){
      this.alertType=1;
      this.alertMessage='Please fill in all required fields correctly.';
      this.userLoginForm.markAllAsTouched();
      return;
    }
    const {email,password}=this.userLoginForm.getRawValue();
    this.userLoginForm.disable();
    this.userService.login(email,password).subscribe({
      next:(result:LoginToken)=>{
        this.userLoginForm.enable();
        if(result.token){
          this.userService.activateToken(result);
          this.alertType=0;
          this.alertMessage='Login successful!';
          this.userLoginForm.reset();
        }
        else{
          this.alertType=1;
          this.alertMessage='Login failed. Please try again.';

        }
        setTimeout(()=>{
          this.location.back();
        },1000);
      },
      error:(err)=>{
        this.userLoginForm.enable();
        this.alertMessage=err.error?.message || 'An error occurred during login. Please try again.';
        this.alertType=2;
      }
    });
  }
}
