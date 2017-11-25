var mongoose = require('mongoose');

let activitySchema = mongoose.Schema({
    name: String,
    icon: String
});

mongoose.model('Activity',activitySchema);