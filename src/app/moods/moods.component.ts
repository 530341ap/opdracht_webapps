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
  private _filteredMoods: Mood[];
  private _years: Number[];
  private _month: Number;
  public active: boolean;
  private _months = ["january","februari","march","april","may","june","july","august","september","october","november","december"]
  constructor(private moodDataService: MoodDataService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this._years = []
    var date = new Date()
    this._month = date.getMonth()+1;
    this._currentYear = date.getFullYear();
    var el = document.getElementById(this._month.toString())
    el.setAttribute("class","collection-item active");
    this.authenticationService.user$.subscribe(val => {
      this._username = val;
    })
    this.moodDataService.moodsByUsername(this._username).subscribe(
      moods => {
        this._moods = moods
        this._filteredMoods = moods.filter(mood => new Date(mood.date).getFullYear() == this._currentYear && new Date(mood.date).getMonth() == this._month.valueOf()-1)});
    this.moodDataService.years(this._username).subscribe(items => {
      items.push(date.getFullYear());
      items.forEach(item => {
        var index = items.findIndex(year => year == item);
        if (index > -1) {
          items.splice(index, 1);
        }
      })
      if(items.length==0){
        items.push(date.getFullYear())
      }
      this._years = items;
    });
  }

  get moods() {
    return this._filteredMoods;
  }

  get anyMoods() {
    return this._filteredMoods == null || this._filteredMoods.length == 0;
  }

  get years() {
    return this._years;
  }

  get currentPlace() {
    return this._months[this._month.valueOf()-1] + " " + this._currentYear
  }

  selectYear(year) {
    this._currentYear = year;
    this._filteredMoods = this._moods.filter(mood => new Date(mood.date).getFullYear() == year && new Date(mood.date).getMonth() == this._month.valueOf()-1)
  }

  changeMonth(month){
    this._filteredMoods = this._moods.filter(mood => new Date(mood.date).getFullYear() == this._currentYear && new Date(mood.date).getMonth() == month-1)
    var el = document.getElementById(month)
    el.setAttribute("class","collection-item active");
    var el = document.getElementById(this._month.toString())
    el.setAttribute("class","collection-item");
    this._month = month;
  }

  deleteMood(mood) {
    this.moodDataService.deleteMood(mood).subscribe()
    this.moodDataService.moodsByUsername(this._username).subscribe(
      moods => {
        this._moods = moods
        this._filteredMoods = moods.filter(mood => new Date(mood.date).getFullYear() == this._currentYear && new Date(mood.date).getMonth() == this._month.valueOf()-1)});
  }

  getDate(date) {
    var val = new Date(date)
    var minutes = val.getMinutes().toString()
    if(minutes.length == 1)
    {
      minutes = "0" + minutes
    }
    return val.getDay() + " " + this._months[val.getMonth()-1] + " " + val.getFullYear() + " " + val.getHours() + ":"+ minutes
  }
}
