var mongoose = require('mongoose');

let moodCategorySchema = mongoose.Schema({
    name: String,
    color: String
});

mongoose.model('MoodCategory',moodCategorySchema);