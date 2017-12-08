import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { AuthGuardService } from '../../auth-guard.service';
import { MoodDataService } from '../../mood-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthenticationService, AuthGuardService, MoodDataService]
})
export class ProfileComponent implements OnInit {
  private _username: string;
  public amount: number;

  constructor(private authenticationService: AuthenticationService,private moodDataService:MoodDataService) { }

  ngOnInit() {
    this.authenticationService.user$.subscribe(val => {
      this._username = val;
    })
    this.moodDataService.moodsByUsername(this._username).subscribe(
      moods => {
        this.amount = moods.length})
  }

  get username() {
    return this._username
  }
}
