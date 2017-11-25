var mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
	username: { type: String, lowercase: true, 
		unique: true }
});

UserSchema.methods.setPassword = function (password) {
}

UserSchema.methods.generateJWT = function () {
};

UserSchema.methods.generateJWT = function () {
    // ...
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.MOOD_BACKEND_SECRET);
  }

mongoose.model('User',UserSchema);