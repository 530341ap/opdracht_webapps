import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import { Mood } from './moods/mood.model';
import { Observable } from 'rxjs';

@Injectable()
export class MoodDataService {
  private _url = "http://localhost:4200/API/";

  constructor(private http: Http) {
  }

  moodsByUsername(name): Observable<Mood[]> {
    let header = new Headers();
    header.append("username", name)
    return this.http.get(this._url + "moodsbyusername", {headers: header}).map(
      res => res.json().map(item =>
        new Mood(item.date, item.category. item.activities, item.id)
      )
    );
  }

  addMood(mood): Observable<Mood> {
    console.log(mood);
    return this.http.post(this._url + "addmood", {tr:mood})
      .map(res => res.json()).map(item => 
        {
        return new Mood(item.date, item.category. item.activities)
      });
  }

  editMood(mood): Observable<Mood> {
    console.log(mood);
    return this.http.put(this._url + "editmood/" +mood.id, {tr:mood})
      .map(res => res.json()).map(item => 
        {
        return new Mood(item.date, item.category. item.activities, item.id)
      });
    }

}
