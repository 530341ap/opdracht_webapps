import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../auth-guard.service';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(private fb: FormBuilder,private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]});
  }

  onSubmit() {
    this.authService.login(this.user.value.username, 
            this.user.value.password).subscribe(val => {
      if (val) {
        if (this.authService.redirectUrl) {
          this.router.navigateByUrl(this.authService.redirectUrl);
          this.authService.redirectUrl = undefined;
        } else {
          this.router.navigate(['/home']);
        }
      }
    }, err => {this.errorMsg = err.json().message});
  }
}
