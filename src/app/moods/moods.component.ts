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
  private _currentYear: Number;
  private _username: string;
  private _moods: Mood[];
  private _years: Number[];
  private _month: Number;
  public active: boolean;
  constructor(private moodDataService: MoodDataService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this._years = []
    var date = new Date()
    this._month = date.getMonth()+1;
    var el = document.getElementById(this._month.toString())
    el.setAttribute("class","collection-item active");
    this.authenticationService.user$.subscribe(val => {
      this._username = val;
    })
    this.moodDataService.moodsByUsernameAndYear(this._username, date.getFullYear()).subscribe(
      moods => this._moods = moods);
    this.moodDataService.years(this._username).subscribe(items => {
      var array = this._years;
      items.filter(function(value, index){ 
        return  array.indexOf(value) == index;})
      this._years = items;
      if(this._years.length == 0 || !this._years.find(year => year == date.getFullYear()))
      {
        this._years.push(date.getFullYear())
      }
    });
  }

  get moods() {
    return this._moods;
  }

  get anyMoods() {
    return this._moods == null || this._moods.length == 0;
  }

  get years() {
    return this._years;
  }

  selectYear(year) {
    this._currentYear = year;
    this.moodDataService.moodsByUsernameAndYear(this._username, year).subscribe( moods => this._moods = moods);
  }

  changeMonth(month){
    this.moodDataService.moodsByMonth(this._username, this._currentYear, month).subscribe( moods => this._moods = moods);
    var el = document.getElementById(month)
    el.setAttribute("class","collection-item active");
    var el = document.getElementById(this._month.toString())
    el.setAttribute("class","collection-item");
    this._month = month;
  }

}
