﻿// Load the module dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('Student');

// Create the Local strategy configuration method
module.exports = function () {
     passport.serializeUser(function(user, done){
        console.log('Serialized');
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done){
        console.log('Deserialized');
        User.findOne({_id:id}, function(err, user){
            done(err, user);
        });
    });
    // Use the Passport's Local strategy 
    passport.use(new LocalStrategy(function (username, password, done) {
        // Use the 'Student' model 'findOne' method to find a user with the current username
        User.findOne({
            studentnumber: username
        }, (err, user) => {
            // If an error occurs continue to the next middleware
            if (err) {
                return done(err);
            }

            // If a user was not found, continue to the next middleware with an error message
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }

            // If the passport is incorrect, continue to the next middleware with an error message
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            // Otherwise, continue to the next middleware with the user object
            return done(null, user);
        });
    }));
};