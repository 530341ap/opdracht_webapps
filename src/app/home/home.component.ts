import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   
})
export class HomeComponent implements OnInit {
  public loggedin: boolean;
  public username: String;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.user$.subscribe(val => {
      this.username = val;
      this.loggedin = (val != null);
    })
  }

}
