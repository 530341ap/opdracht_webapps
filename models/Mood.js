var mongoose = require('mongoose');

let moodSchema = mongoose.Schema({
    date: Date,
    activtities:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
        }
    ],
    moodCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MoodCategory'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Mood',moodSchema);