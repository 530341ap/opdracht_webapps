export class MoodCategory {
    private _id: Number;
    private _color: String;
    private _name: String;

    constructor(color:String, name:String, id?:Number) {
        this._color = color;
        this._id = id;
    }

    get color() {
        return this._color;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            color: this._color
        }
    }
}