import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import { Mood } from './moods/mood.model';
import { Observable } from 'rxjs';
import { Activity } from './moods/activity.model';
import { INSPECT_MAX_BYTES } from 'buffer';

@Injectable()
export class MoodDataService {
  private _url = "http://localhost:4200/API/";

  constructor(private http: Http) {
  }

  moodsByUsernameAndYear(name,date): Observable<Mood[]> {
    let header = new Headers();
    header.append("username", name)
    header.append("year",date)
    return this.http.get(this._url + "moodsbyyear", {headers: header}).map(
      res => res.json().map(item =>
        new Mood(item.date, item.category. item.activities, item.id)
      )
    );
  }

  moodsByMonth(name,year,month): Observable<Mood[]> {
    let header = new Headers();
    header.append("username", name)
    header.append("year",year)
    header.append("month",month)
    return this.http.get(this._url + "moodsbymonth", {headers: header}).map(
      res => res.json().map(item =>
        new Mood(item.date, item.category. item.activities, item.id)
      )
    );
  }

  years(name): Observable<Number[]> {
    let header = new Headers();
    header.append("username", name)
    return this.http.get(this._url + "moodsbyusername", {headers: header}).map(
      res => res.json().map(item =>
        new Mood(item.date, item.category. item.activities, item.id)
      ).map(item => item.date.getFullYear())
    );
  }

  addMood(mood): Observable<Mood> {
    console.log(mood);
    return this.http.post(this._url + "addmood", {m:mood})
      .map(res => res.json()).map(item => 
        {
        return new Mood(item.date, item.category. item.activities)
      });
  }

  editMood(mood): Observable<Mood> {
    console.log(mood);
    return this.http.put(this._url + "editmood/" +mood.id, {m:mood})
      .map(res => res.json()).map(item => 
        {
        return new Mood(item.date, item.category. item.activities, item.id)
      });
    }

  addActivity(activity,username): Observable<Activity> {
      return this.http.post(this._url + "addactivity", {a:activity,user:username})
        .map(res => res.json()).map(item => 
          {
          return new Activity("", item.name)
        });
    }
  
    activitiesByUsername(name): Observable<Activity[]> {
      let header = new Headers();
      header.append("username", name)
      return this.http.get(this._url + "activitiesbyusername", {headers: header}).map(
        res => res.json().map(item =>{
          return new Activity(item.icon, item.name, item._id)}
      ));
    }

    deleteActivity(naam) {
      console.log(naam)
      return this.http.post(this._url + "deleteactivity", {name: naam})
      .map(res => res.json()).map(item => 
        {
          return new Activity("", item.name)
      });
    }
}
