var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var env = require('env2')('.env');
var crypto = require('crypto');

let UserSchema = mongoose.Schema({
	username: { type: String, lowercase: true, 
        unique: true },
    salt: String,
    hash: String
});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(32).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
    return this.hash == hash;
}

UserSchema.methods.generateJWT = function () {
    var exp = new Date();
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.MOOD_BACKEND_SECRET);
  }

mongoose.model('User',UserSchema);