var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
	company: {
		type: String,
		required: "You need a company name for this entry.",
	},
	position: {
		type: String, 
		required: "You need a job description for this entry.",
	},
	status: {
		type: String,
		enum: ['in_progress', 'awaiting_response', 'rejected', 'accepted'],
		default: 'in_progress',
	},
});

module.exports = mongoose.model('Entry', entrySchema);
