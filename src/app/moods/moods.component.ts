import { Component, OnInit } from '@angular/core';
import { Mood } from './mood.model';
import { Activity } from './activity.model';
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service';
import { MoodDataService } from '../mood-data.service';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.css'],
  providers: [AuthenticationService, AuthGuardService, MoodDataService]
})
export class MoodsComponent implements OnInit {
  private username: string;
  private _moods: Mood[];
  private _activities: Activity[];
  constructor(private moodDataService: MoodDataService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.user$.subscribe(val => {
      this.username = val;
    })
    this.moodDataService.moodsByUsername(this.username).subscribe(
      moods => this._moods = moods);
  }

  get moods() {
    return this._moods;
  }

  get anyMoods() {
    return this._moods == null || this._moods.length == 0;
  }

}
