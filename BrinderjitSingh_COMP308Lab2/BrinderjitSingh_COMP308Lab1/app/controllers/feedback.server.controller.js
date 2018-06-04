var Customer = require('mongoose').model('Customer');
var Feedback = require('mongoose').model('Feedback');
exports.displayfeedback = function (req, res) {
    var isAdmin = false;
    console.log(req.session.user + 'Feedback' );
    if (req.session.user !== null || req.session.user!=='undefined') {

        Customer.find({ userName: req.session.username }, (err, Customers) => {
            var user = Customers[0];
           
            res.render('feedback', {
                headtitle: "Feedback",
                emailvalue: user.userName,
                firstname: user.firstName,
                lastname: user.lastName,
                sport: user.sports,
                food: user.food
            });
        });
        
       
    }
    else {
        res.redirect("/");
    }
   
};
exports.submitfeedback = function (req, res) {
    var feedback = new Feedback(req.body);
    Customer.find(req.session.email, (err, Customers) => {
        if (err) {
            res.render('index', {
                headtitle: "Login",
                err: "Error occurred try again"
            });
        } else {
            feedback.customer = Customers[0];
            feedback.save(function (err) {
                if (err) {
                    // Call the next middleware with an error message
                    return next(err);
                } else {
                  
                    res.redirect('/thankyou');
                }
            });
        }
    });
   
   
    
   
    
};

exports.getviewpage= function (req, res) {
            res.render('viewcustomerfeedback', {
                headtitle:'All feedbacks'
            });

};
exports.displayThanks = function (req, res) {
    res.render('thankyou', {
        headtitle: "Thanks",
        msg: req.session.user,
        checkAdmin: req.session.role
    });
};
exports.viewAllFeedback = function (req, res) {

    Feedback.find({ email: req.body.email }).populate('customer').exec((err, feedbacks) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            res.render('viewcustomerfeedback', {
                feedbacks: feedbacks,
                headtitle: 'All feedbacks'
            });

        }
    });

};