import { Component, OnInit } from '@angular/core';
import { MoodCategory } from '../moodCategory.model';
import { Activity } from '../activity.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MoodDataService } from '../../mood-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { AuthGuardService } from '../../auth-guard.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [AuthenticationService, AuthGuardService, MoodDataService]
})
export class SettingsComponent implements OnInit {
  private _username: string;
  private _activities: Activity[];
  private _categories: MoodCategory[];
  private activityform: FormGroup;

  constructor(private _moodService: MoodDataService, private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
    this.activityform = this.fb.group({
      name: ['',[Validators.required]]
    });
    this.authService.user$.subscribe(val => {
      this._username = val;
    })

    this._moodService.activitiesByUsername(this._username).subscribe(
      acts => this._activities = acts);
  }

  get activities() {
    return this._activities;
  }

  get categories() {
    return this._categories;
  }

  onSubmit() {
    let activity = new Activity("",this.activityform.get("name").value);
    this._moodService.addActivity(activity,this._username).subscribe();
      this._moodService.activitiesByUsername(this._username).subscribe(
        acts => {this._activities = acts;});    
  }

  deleteActivity(naam) {
    this._moodService.deleteActivity(naam).subscribe()
    this._moodService.activitiesByUsername(this._username).subscribe(
      acts => {this._activities = acts;});
  }

}
