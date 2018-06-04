var Customer = require('mongoose').model('Customer');
var Role = require('mongoose').model('Role')
exports.displayLogin = function (req, res) {
    res.render('index', {
        headtitle: "Login"
    });
};
exports.isLoggedIn = function (req, res, next) {
    if (req.session.user !== null) {
        res.locals.title = req.session.user;
        console.log(req.session.username);
        var roles;
        Role.find({ email: req.session.username }, (err, roles) => {
            if (roles.length > 0) {

                if (roles[0].role === 'Admin') {
                    req.session.role = roles[0].role;
                    res.locals.checkAdmin = roles[0].role;
                    console.log(roles[0].role);
                }
            }

        });
        next();

    } else {
        res.redirect('/');
    }
};
exports.submitLogin = function (req, res) {
   
    var isAuthenticated = false;
    var customers;
        Customer.find({ $and: [{ userName: req.body.username }, { password: req.body.password }] }, (err, Customers) => {
            if (err) {
                res.render('index', {
                    err: "Error occurred try again"
                });
            } else {
                if (Customers.length > 0) {
                    var user = Customers[0];
                    req.session.user = user.firstName + ' ' + user.lastName;
                    req.session.username = user.userName;
                    res.redirect("/feedback");
                }
                else {
                    console.log("body: " + req.body.username);
                    res.render('index', {
                        headtitle: "Login",
                        err: "Invalid username or password"
                    });
                }
            
            
            }
    });
        if (isAuthenticated) {
               
        }
};
exports.logout = function (req, res) {
    req.session.user = null;
    req.session.role = null;
    res.locals.title = null;
    res.redirect('/');
    
};