// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'UserSchema'
var RoleSchema = new Schema({
    email: String,
    role:String
});
mongoose.model('Role', RoleSchema);