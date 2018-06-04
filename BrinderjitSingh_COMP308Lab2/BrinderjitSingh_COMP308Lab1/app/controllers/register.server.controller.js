var Customer = require('mongoose').model('Customer');
exports.displayRegister = function (req, res) {
    res.render('signup', {
        headtitle: "Register"
    });
};
exports.submitRegister = function (req, res) {

    
    var customer = new Customer(req.body);
  

    // Use the 'User' instance's 'save' method to save a new user document
    customer.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            res.render('signup', {
                headtitle: "Register",
                msg:"Successfully registered."
            });

        }
    });
};