export class Activity {
    private _id: Number;
    private _icon: String;
    private _name: String;

    constructor(icon:String, name:String, id?:Number) {
        this._icon = icon;
        this._id = id;
        this._name = name;
    }

    get icon() {
        return this._icon;
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
            icon: this._icon
        }
    }
}