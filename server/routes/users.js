var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;
