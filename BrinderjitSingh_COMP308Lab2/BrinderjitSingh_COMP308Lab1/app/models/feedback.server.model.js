// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var FeedbackSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    comments: { type: String, required: true },
    sports: String,
    food: String,
    customer: {
        type: Schema.ObjectId, ref: 'Customer'
    }
});
// Create the 'User' model out of the 'UserSchema'
mongoose.model('Feedback', FeedbackSchema);