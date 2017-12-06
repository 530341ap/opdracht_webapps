var mongoose = require('mongoose');

let activitySchema = mongoose.Schema({
    name: String,
    icon: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Activity',activitySchema);