import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, ValidatorFn, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../auth-guard.service';
import { User } from '../User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public passwordGroup: FormGroup;

  constructor(private fb: FormBuilder,private authenticationService: AuthenticationService, private router: Router) { }
  
  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)], 
        this.serverSideValidateUsername()]});
      this.passwordGroup = this.fb.group({
        password: ['', [Validators.required, this.passwordValidator(8)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords });
  
  }

  onSubmit() {
    if(this.user.valid && this.passwordGroup.valid){
      this.authenticationService.register(this.user.value.username, this.passwordGroup.value.password).subscribe(val => console.log(val));
      this.router.navigate(['/home']);
    }
    
  }

  passwordValidator(length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return control.value.length < length ? { 'passwordTooShort': 
        { requiredLength: length, actualLength: control.value.length } } : null;
    };
  }
  
  comparePasswords(control: AbstractControl): { [key: string]: any } {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): 
      Observable<{ [key: string]: any }> => {
      return this.authenticationService.
        checkUserNameAvailability(control.value).map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    };
  }

  
}
