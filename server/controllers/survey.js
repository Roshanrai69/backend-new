//require modules for the controller
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the model
let Survey = require('../models/surveys');
let SurveyAnswer = require('../models/surveysAnswer');

//display Contact list and sorted in ascending order
module.exports.displaySurveyList = (req, res, next) => {
  console.log("displaySurveyList")
  Survey.find((err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json(surveyList);
    }
  }).sort({ name: 1 });
};

//Display the Create A Survey page
module.exports.displayAddPage = (req, res, next) => {
  res.render('survey/add', {
    title: 'Create A Survey',
    displayName: req.user ? req.user.displayName : '',
  });
};

//Process the Add survey operation
module.exports.processAddPage = (req, res, next) => {
  let newSurvey = Survey({
    name: req.body.name,
    OwnerName: req.body.OwnerName,
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3,
    q4: req.body.q4,
    q5: req.body.q5,
  });

  Survey.create(newSurvey, (err, survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json(survey);
    }
  });
};

//Display the Update Survey page
module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, surveyToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render('survey/edit', {
        title: 'Edit Survey',
        survey: surveyToEdit,
        displayName: req.user ? req.user.displayName : '',
      });
    }
  });
};

// Process the update Survey operation
module.exports.processEditPage = (req, res, next) => {
  console.log("processEditPage")
  let id = req.params.id;

  let updatedSurvey = Survey({
    _id: id,
    name: req.body.name,
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3,
    q4: req.body.q4,
    q5: req.body.q5,
  });

  Survey.updateOne({ _id: id }, updatedSurvey, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the contact list
      res.json(updatedSurvey);
    }
  });
};

//Display the Fill Survey page
module.exports.displayFillPage = (req, res, next) => {
  let id = req.params.id;
  Survey.findById(id, (err, surveyToFill) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.json(surveyToFill);
    }
  });
};

// Process the update survey answer operation
module.exports.processFillPage = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, surveyToFill) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      if (surveyToFill) {
        let fillNewSurvey = SurveyAnswer({
          SurveryID: id,
          a1: req.body.a1,
          a2: req.body.a2,
          a3: req.body.a3,
          a4: req.body.a4,
          a5: req.body.a5,
        });

        SurveyAnswer.create(fillNewSurvey, (err, surveyAnswer) => {
          if (err) {
            console.log(err);
            res.end(err);
          } else {
            //refresh the survey list
            return res.json({ success: true, msg: 'Successfully Fill Survey', surveyAnswer });
          }
        });
      }
    }
  });
};

//Display the Survey owned by User page
module.exports.displayMySurveyPage = (req, res, next) => {
  let owner = req.params.dispalName;
  console.log("displayMySurveyPage");

  Survey.find({ OwnerName: owner }, (err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log("Get survey List")
      res.json(surveyList);
    }
  }).sort({ name: 1 });
};

//Display the Survey Responses page
module.exports.displaySurveyInfoPage = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, survey) => {
    if (err) {
      return console.error(err);
    } else {
      SurveyAnswer.find({ SurveryID: id }, (err, surveyList) => {
        if (err) {
          return console.error(err);
        } else {
          res.render('survey/surveyinfo', {
            title: survey.name,
            survey: survey,
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName : '',
          });
        }
      }).sort({ name: 1 });
    }
  });
};

//Delete the survey
module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  Survey.remove({ _id: id }, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the survey list
      res.json({ success: true, msg: 'Successfully Delete Survey' });
    }
  });
};
