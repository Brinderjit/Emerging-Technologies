// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var CustomerSchema = new Schema({
    firstName: { type: String,required: true},
    lastName: { type: String, required: true },
    email: String,
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    sports: String,
    food: String
});
// Create the 'User' model out of the 'UserSchema'
mongoose.model('Customer', CustomerSchema);