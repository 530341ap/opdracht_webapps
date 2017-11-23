import { Component, OnInit } from '@angular/core';
import { Mood } from './mood.model';
import { Activity } from './activity.model';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.css']
})
export class MoodsComponent implements OnInit {

  private moods: Mood[];
  private activities: Activity[];
  constructor() { }

  ngOnInit() {
  }

}
