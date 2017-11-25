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
    }
});

mongoose.model('mood',moodSchema);