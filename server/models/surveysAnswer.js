//require modules for the Survey Model
let mongoose = require('mongoose');

//create a model class
let SurveyAnswerModel = mongoose.Schema(
  {
    SurveryID: String,
    UserName: String,
    a1: String,
    a2: String,
    a3: String,
    a4: String,
    a5: String,
  },
  {
    collection: 'surveysAnswer',
  }
);

module.exports = mongoose.model('surveysAnswer', SurveyAnswerModel);
