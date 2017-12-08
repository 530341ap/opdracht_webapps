import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import { Mood } from './moods/mood.model';
import { Observable } from 'rxjs';
import { Activity } from './moods/activity.model';
import { INSPECT_MAX_BYTES } from 'buffer'; 
import { MoodCategory } from './moods/moodCategory.model';


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
        new Mood(item.date, item.moodCategory, item.activities, item._id)
      ));
  }

  moodById(name, id): Observable<Mood> {
    let header = new Headers();
    header.append("username", name)
    header.append("id",id)
    return this.http.get(this._url + "moodbyid", {headers: header}).map(
      res => res.json()).map(item => {
        return new Mood(item.date, item.moodCategory, item.activities, item._id)
      });
  }

  years(name): Observable<Number[]> {
    let header = new Headers();
    header.append("username", name)
    return this.http.get(this._url + "moodsbyusername", {headers: header}).map(
      res => res.json().map(item =>
        new Mood(item.date, item.moodCategory, item.activities, item._id)
      ).map(item => (new Date(item.date)).getFullYear())
    );
  }

  addMood(mood, username): Observable<Mood> {
    return this.http.post(this._url + "addmood", {m:mood, user: username})
      .map(res => res.json()).map(item => 
        {
        return new Mood(item.date, item.moodCategory, item.activities)
      });
  }

  editMood(mood, username): Observable<Mood> {
    return this.http.put(this._url + "editmood", {m:mood, user: username})
      .map(res => res.json()).map(item => 
        {
        return new Mood(item.date, item.moodCategory, item.activities, item._id)
      });
    }

    deleteMood(mood) {
      return this.http.post(this._url + "deletemood", {id: mood._id})
      .map(res => res.json()).map(item => 
        {
          return new Mood(item.date, item.moodCategory, item.activities, item._id)
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
      return this.http.post(this._url + "deleteactivity", {name: naam})
      .map(res => res.json()).map(item => 
        {
          return new Activity("", item.name)
      });
    }

    checkActivity(username, activity): Observable<boolean> {
      return this.http.post(this._url + "checkactivity", { username: username, a: activity }).map(res => res.json())
      .map(item => {
        if (item.activity === 'exists') {
          return true;
        } else {
          return false;
        }
      });
    }

    addCategories(categories): Observable<MoodCategory[]> {
      return this.http.post(this._url + "addcategories", {cats:categories})
      .map(res => res.json().map(item => 
        {
        return new MoodCategory(item.color, item.name)
      }));
    }

    moods(): Observable<MoodCategory[]> {
      return this.http.get(this._url + "moods").map(
        res => res.json().map(item =>{
          return new MoodCategory(item.color, item.name, item._id)}
      ));
    }
}
