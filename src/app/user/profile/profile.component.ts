import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { AuthGuardService } from '../../auth-guard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
   
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
