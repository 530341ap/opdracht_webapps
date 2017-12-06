var mongoose = require('mongoose');

let moodCategorySchema = mongoose.Schema({
    name: String,
    color: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('MoodCategory',moodCategorySchema);