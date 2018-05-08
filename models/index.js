var mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connect(process.env.DATABASE_URL);

mongoose.Promise = Promise;


function statusSortKey(a, b) {
	return a.status > b.status;
}



module.exports.Entry = require('./entry');
module.exports.statusSortKey = statusSortKey;
