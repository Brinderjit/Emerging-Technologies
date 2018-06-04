const register = require('../controllers/register.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Mount the 'index' controller's 'render' method
    app.get('/signup', register.displayRegister);
    app.post('/signup', register.submitRegister);
};