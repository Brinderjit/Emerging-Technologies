const feedback = require('../controllers/feedback.server.controller');
const login = require('../controllers/login.server.controller');
// Define the routes module' method
module.exports = function (app) {
    // Mount the 'index' controller's 'render' method
    app.get('/thankyou', login.isLoggedIn, feedback.displayThanks);
    app.get('/feedback', login.isLoggedIn ,feedback.displayfeedback);
    app.post('/feedback', login.isLoggedIn, feedback.submitfeedback);
    app.get('/viewfeedback', login.isLoggedIn ,feedback.getviewpage);
    app.post('/viewfeedback', login.isLoggedIn, feedback.viewAllFeedback);
};