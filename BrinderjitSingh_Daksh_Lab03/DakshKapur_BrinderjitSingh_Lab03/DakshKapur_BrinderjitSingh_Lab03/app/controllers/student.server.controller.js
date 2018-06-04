// Load the module dependencies
const User = require('mongoose').model('Student');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var config = require('../../config/config'); 
// Create a new error handling controller method
const getErrorMessage = function (err) {
    // Define the error message variable
    let message = '';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs set the message error
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            // If a general error occurs set the message error
            default:
                message = 'Something went wrong';
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (const errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    // Return the message error
    return message;
};

// Create a new controller method that signin users
exports.signin = function (req, res, next) {
    User.findOne({
    studentnumber: req.body.username
  }, function(err, user) {
       if (err) throw err;
    if (!user) {
      res.status(401).send({success: false,  message: 'Authentication failed. User not found.'});
    }
    else if (!user.authenticate(req.body.password)) {
         res.status(401).send({success: false,  message: 'Invalid password'});
     }
     else {
    
     console.log(user);
          var token = jwt.sign(JSON.parse(JSON.stringify(user)), config.sessionSecret);
          // return the information including token as JSON
console.log(user);
          res.json({success: true, token:token,user:user});
        }  
  });
}

// Create a new controller method that creates new 'regular' users
exports.signup = function (req, res) {
    console.log(req.body);
    var user = new User(req.body);
   // user.provider = 'local';
    user.role='user';
    // Try saving the User
    user.save((err) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            // Login the user
           
                   res.status(200).json(user);
              
           
        }
    });
}
exports.getAllStudents=function(req,res){
    User.find( (err, students) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(students);
        }
    });
}
// Create a new controller method that creates new 'OAuth' users
exports.saveOAuthUserProfile = function (req, profile, done) {
    // Try finding a user document that was registered using the current OAuth provider
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, (err, user) => {
        // If an error occurs continue to the next middleware
        if (err) {
            return done(err);
        } else {
            // If a user could not be found, create a new user, otherwise, continue to the next middleware
            if (!user) {
                // Set a possible base username
                const possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

                // Find a unique available username
                User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
                    // Set the available user name 
                    profile.username = availableUsername;

                    // Create the user
                    user = new User(profile);

                    // Try saving the new user document
                    user.save(function (err) {
                        // Continue to the next middleware
                        return done(err, user);
                    });
                });
            } else {
                // Continue to the next middleware
                return done(err, user);
            }
        }
    });
};

// Create a new controller method for signing out
exports.signout = function (req, res) {
    // Use the Passport 'logout' method to logout
    req.logout();

    // Redirect the user back to the main application page
    res.redirect('/');
};
//uses the Passport-initiated req.
//isAuthenticated() method to check whether a user is currently authenticated
exports.requiresLogin = function (req, res, next) {
    console.log(req.headers);
    if (req.headers && req.headers.authorization) {
    var parted = req.headers.authorization.split(' ');
   var decoded;
    if (parted.length === 2) {
       decoded = jwt.verify(parted[1], config.sessionSecret);
       console.log(decoded);

    }
   
    if (!decoded) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
     next();
    }
    else
    {
        return res.status(401).send({
                    message: 'No Authentication token sent to server'
                });
    }
   
};
//
