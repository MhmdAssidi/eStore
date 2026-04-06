import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,AbstractControl,Validators } from '@angular/forms';
import { matchPasswordValidator } from './validators/match-passworrd.validators';
@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  userSignupForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
}
