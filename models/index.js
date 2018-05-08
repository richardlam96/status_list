var mongoose = require('mongoose');
mongoose.set('debug', true);

// mongoose.connect('mongodb://localhost/job_search_api');



process.env.databaseUrl = 'mongodb://richard:richy123@ds157631.mlab.com:57631/status_list';
mongoose.connect(process.env.databaseUrl);

mongoose.Promise = Promise;


function statusSortKey(a, b) {
	return a.status > b.status;
}



module.exports.Entry = require('./entry');
module.exports.statusSortKey = statusSortKey;
