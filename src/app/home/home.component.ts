import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthenticationService, AuthGuardService]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
