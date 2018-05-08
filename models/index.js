var mongoose = require('mongoose');
mongoose.set('debug', true);

// mongoose.connect('mongodb://localhost/job_search_api');



mongoose.connect('mongodb://richard:richy123@ds157631.mlab.com:57631/status_list');

mongoose.Promise = Promise;


function statusSortKey(a, b) {
	return a.status > b.status;
}



module.exports.Entry = require('./entry');
module.exports.statusSortKey = statusSortKey;
