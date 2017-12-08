import { Component, OnInit } from '@angular/core';
import { MoodCategory } from '../moodCategory.model';
import { Activity } from '../activity.model';
import { Mood } from '../mood.model';
import { MoodDataService } from '../../mood-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { AuthGuardService } from '../../auth-guard.service';

@Component({
  selector: 'app-add-mood',
  templateUrl: './add-mood.component.html',
  styleUrls: ['./add-mood.component.css'],
  providers:[AuthenticationService, AuthGuardService, MoodDataService]
})
export class AddMoodComponent implements OnInit {
  private _mood: Mood;
  private _activities: Activity[];
  private _categories: MoodCategory[];
  private _cardActivities: Activity[];
  private _cardCategory: MoodCategory;
  private _date: Date;
  private moodform: FormGroup;
  private _username: String;

  constructor(private authenticationService: AuthenticationService,private _moodService: MoodDataService, private fb: FormBuilder,private router:  Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.authenticationService.user$.subscribe(val => {
      this._username = val;
    })
    this._moodService.activitiesByUsername(this._username).subscribe(
      acts => this._activities = acts);
      this._moodService.moods().subscribe(moods => this._categories = moods )
      this._cardActivities = []
      this._date = new Date()
    this.moodform = this.fb.group({
      date: this.fb.control("",[Validators.required]),
      time: this.fb.control("",[Validators.required]),
      activity: []
    });
    this.route.paramMap.subscribe(par => {
      if(par.get("id") != null || par.get("id") != undefined){
      this._moodService.moodById(this._username, par.get('id')).subscribe(item => {
        this._mood = item
        this.veranderMood(item);
      })}
    });
  }

  onSubmit() {
    var chosenDate: string = this.moodform.value.date
    var chosenTime: string = this.moodform.value.time
    this._date = new Date(chosenDate)
    var hour = Number.parseInt(chosenTime.substr(0,2))
    if(chosenTime.substr(5,2)=="AM")
    {
      if(hour == 12)
        hour -= 12
      this._date.setHours(hour, Number.parseInt(chosenTime.substr(3,2)))
    } else {
      if(hour != 12)
        hour += 12
      this._date.setHours(hour, Number.parseInt(chosenTime.substr(3,2)))
    }
    if(this._cardCategory != null){
    if (this._mood == null || this._mood == undefined) {
      let mood = new Mood(this._date, this._cardCategory, this._cardActivities);
        this._moodService.addMood(mood, this._username).subscribe();
      this.router.navigate(['/moods']);
    } else {
      let mood = new Mood(this._date, this._cardCategory, this._cardActivities, this._mood.id);
      this._moodService.editMood(mood, this._username)
      .subscribe();
      this.router.navigate(['/moods']);
    }} 
  }

  add() {
    var chip = this.moodform.value.activity
    this._moodService.checkActivity(this._username, chip).subscribe(val => {
      this._cardActivities.push(new Activity("",chip));
      if(!val) {
        this._moodService.addActivity(new Activity("",chip),this._username).subscribe()
      } 
    })
    
  }

  delete(chip) {
    var index = this._cardActivities.findIndex(item => item.name.toLowerCase === chip.toLowerCase);
    if (index > -1) {
       this._cardActivities.splice(index, 1);
    }
  }

  select(chip) {
    console.log("Chip selected: " + chip.tag);
  }

  setMood(mood) {
    this._cardCategory = this._categories.find(item => item.name.toLowerCase() == mood)
  }

  get mood() {
    return this._mood;
  }

  get activities() {
    return this._cardActivities;
  }

  get hasCategory() {
    return this._cardCategory != null
  }

  veranderMood(mood) {
    var months = ["january","februari","march","april","may","june","july","september","october","november","december"]
    var date = new Date(mood.date)
    var minutes = date.getMinutes().toString()
    if(minutes.length == 1)
    {
      minutes = "0" + minutes
    }
    var day = date.getDay() + " "+ months[date.getMonth()-1] + ", "+date.getFullYear()
    var hour = date.getHours()+":"+minutes
    this.moodform.get("date").setValue(day)
    this.moodform.get("time").setValue(hour)
    this._cardActivities = mood.activities
    this._cardCategory = mood.category
  }
}
