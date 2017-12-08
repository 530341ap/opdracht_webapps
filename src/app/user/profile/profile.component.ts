import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { AuthGuardService } from '../../auth-guard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthenticationService, AuthGuardService]
})
export class ProfileComponent implements OnInit {
  private _username: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.user$.subscribe(val => {
      this._username = val;
    })
  }

  get username() {
    return this._username
  }
}
