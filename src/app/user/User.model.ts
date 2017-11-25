export class User {
    private _username: String;
    private _password: String;

    constructor(username:String, password:String){
        this._username = username;
        this._password = password;
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }

    toJSON(){
        return {
            username: this._username,
            password: this._password
        }
    }
}