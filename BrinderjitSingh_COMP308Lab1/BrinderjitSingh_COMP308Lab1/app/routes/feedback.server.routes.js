const feedback = require('../controllers/feedback.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Mount the 'index' controller's 'render' method
    app.get('/feedback', feedback.displayfeedback);
    app.post('/feedback', feedback.submitfeedback);
};