const login = require('../controllers/login.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Mount the 'index' controller's 'render' method
    app.get('/', login.displayLogin);
    app.post('/', login.submitLogin);
};