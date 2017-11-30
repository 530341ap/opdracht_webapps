import { Component, OnInit } from '@angular/core';
import { MoodCategory } from '../moodCategory.model';
import { Activity } from '../activity.model';
import { Mood } from '../mood.model';
import { MoodDataService } from '../../mood-data.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms/src/model';

@Component({
  selector: 'app-add-mood',
  templateUrl: './add-mood.component.html',
  styleUrls: ['./add-mood.component.css'],
  providers:[MoodDataService]
})
export class AddMoodComponent implements OnInit {
  private _mood: Mood;
  private _activities: Activity[];
  private _categories: MoodCategory[];
  private _cardActivities: Activity[];
  private _cardCategory: MoodCategory;
  private _date: Date;
  private moodform: FormGroup;

  constructor(private _moodService: MoodDataService, private fb: FormBuilder,private router:  Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.moodform = this.fb.group({
      date: [],
      time: []
    });

    this.route.paramMap.subscribe(par => {
    });
  }

  onSubmit() {
    let mood = new Mood(this._date, this._cardCategory, this._cardActivities);
    if (this._mood == null || this._mood == undefined) {
        this._moodService.addMood(mood).subscribe();
      console.log(this.moodform.errors);
      this.router.navigate(['/moods']);
    } else {
      this._moodService.editMood(mood)
      .subscribe();
      this.router.navigate(['/moods']);
    }
  }
}
