var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/job_search_api');
mongoose.Promise = Promise;

module.exports.Entry = require('./entry');
