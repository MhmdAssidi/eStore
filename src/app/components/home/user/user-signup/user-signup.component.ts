import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,AbstractControl,Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { matchPasswordValidator } from './validators/match-passworrd.validators';
import {  UserService } from '../services/user.service';
import { User } from '../../types/user.type';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css',
  providers: [UserService]
})
export class UserSignupComponent {
  userSignupForm: FormGroup;
  alertMessage: string = '';
  alertType:number = 0; //0: no alert, 1: success, 2: error
  constructor(private fb: FormBuilder,private userService: UserService) {
    this.userSignupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: [''],
      city: [''],
      state: [''],
      pin: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{
      validators: matchPasswordValidator
    });
  }

  getFirstNameControl(): AbstractControl<any,any>|null {
    //AbstractControl is the base class for FormControl, FormGroup, and FormArray. It provides common properties and methods for all form controls, such as value, errors, valid, touched, etc.
    // This function returns the object that controls the "firstName" input field
    return this.userSignupForm.get('firstName') as AbstractControl;  //return FormControl (AbstractControl) that contains value, errors, valid, touched
  }
  getEmailControl(): AbstractControl<any,any>|null {
    return this.userSignupForm.get('email') as AbstractControl;
  }
  getPasswordControl(): AbstractControl<any,any>|null {
    return this.userSignupForm.get('password') as AbstractControl;
  }
  getConfirmPasswordControl(): AbstractControl<any,any>|null {
    return this.userSignupForm.get('confirmPassword') as AbstractControl;
  }
  onSubmit(): void {
  if (this.userSignupForm.invalid) {
    this.alertMessage = 'Please fill in all required fields correctly.';
    this.alertType = 2;
    this.userSignupForm.markAllAsTouched();
    return;
  }

  this.alertMessage = '';
  this.alertType = 0;

  const formValue = this.userSignupForm.getRawValue();

  const newUser:User = {
    id:0,
    firstname: formValue.firstName,
    lastname: formValue.lastName,
    address: formValue.address,
    city: formValue.city,
    state: formValue.state,
    pin: formValue.pin,
    email: formValue.email,
    password: formValue.password
  };

  this.userSignupForm.disable();

  this.userService.createUser(newUser).subscribe({
    next: (result) => {
      if (result.message === 'User registered successfully') {
        this.alertMessage = 'User created successfully!';
        this.alertType = 0; 
        this.userSignupForm.reset();
      } else {
        this.alertMessage = 'Email already exists. Please use a different email.';
        this.alertType = 1;
      }
      
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error creating user:', error);
      this.alertMessage = 'An error occurred while creating the user. Please try again.';
      this.alertType = 2;
      this.userSignupForm.enable();
    }
  });
}
}
