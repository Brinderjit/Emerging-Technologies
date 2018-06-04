exports.displayLogin = function (req, res) {
    res.render('index', {
        message: 'This is an important message to comp308 students!!'
    });
};
exports.submitLogin = function (req, res) {

    var user = req.body.username;
    console.log(user);
    var pass = req.body.password;
    
    res.render('feedback', {
        emailvalue: user
    });
};