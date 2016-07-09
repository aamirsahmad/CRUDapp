var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
   title: String,
   code: String,
   year: Number,
   term: String,
   credit: Number
});

module.exports = mongoose.model('Course', CourseSchema);