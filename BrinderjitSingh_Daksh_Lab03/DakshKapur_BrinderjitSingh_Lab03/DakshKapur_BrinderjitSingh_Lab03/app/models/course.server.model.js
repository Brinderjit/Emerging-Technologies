// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define a new 'TaskSchema'
var CourseSchema = new Schema({
    coursecode: {
        type: String,
        required: true
    },
    coursename: {
        type: String,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'Student'
    }
});

// Create the 'Course' model out of the 'CourseSchema'
mongoose.model('Course', CourseSchema);