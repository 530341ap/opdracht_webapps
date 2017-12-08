import { MoodCategory } from "./moodCategory.model";
import { Activity } from "./activity.model";

export class Mood {
    private _id: string;
    private _category: MoodCategory;
    private _activities: Activity[];
    private _date: Date;

    constructor(date: Date, category:MoodCategory, activities: Activity[] = [], id?:string) {
        this._category = category;
        this._id = id;
        this._activities = activities;
        this._date = date;
    }

    get category() {
        return this._category;
    }

    get activities() {
        return this._activities;
    }

    get id() {
        return this._id;
    }

    get date() {
        return this._date;
    }

    addActivity(activity: Activity){
        this._activities.push(activity);
    }

    addActivities(activities: Activity[]){
        this._activities.concat(activities);
    }

    toJSON() {
        return {
            id: this._id,
            category: this._category,
            activities: this._activities,
            date: this._date
        }
    }
}