exports.displayfeedback = function (req, res) {
  
    res.render('feedback', {
        email: user
    });
};
exports.submitfeedback = function (req, res) {
    res.render('thankyou', {
        name: req.body.firstname + " " + req.body.lastname
    });
};