import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService, AuthGuardService]
})
export class AppComponent {
  title = 'app';
  public loggedin: boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authenticationService.user$.subscribe(val => {
      this.loggedin = (val != null);
      console.log(this.loggedin)
    })
  }
}
