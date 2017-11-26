import { Component, OnInit } from '@angular/core';
import { Mood } from './mood.model';
import { Activity } from './activity.model';
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.css'],
  providers: [AuthenticationService, AuthGuardService]
})
export class MoodsComponent implements OnInit {

  private moods: Mood[];
  private activities: Activity[];
  constructor() { }

  ngOnInit() {
  }

}
