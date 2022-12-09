//require modules for the routes
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//reference controller
let surveyController = require('../controllers/survey');

// helper function for guard purpose
function requireAuth(req, res, next) {
  //check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect('/user/login');
  }
  next();
}

/* GET Route for the Contact List page - READ Openration */
router.get('/', surveyController.displaySurveyList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', surveyController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', surveyController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', surveyController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', surveyController.processEditPage);

/* GET Route for displaying the Fill page - READ Operation */
router.get('/fill/:id', surveyController.displayFillPage);

/* POST Route for processing the Fill page - Create Operation */
router.post('/fill/:id', surveyController.processFillPage);

/* POST Route for displaying the Survey owned by User page - READ Operation */
router.get('/mysurvey/:displayName', surveyController.displayMySurveyPage);

/* POST Route for displaying the Survey's reponses - READ Operation */
router.get(
  '/surveyInfo/:id',
  requireAuth,
  surveyController.displaySurveyInfoPage
);

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', surveyController.performDelete);

module.exports = router;
