var express = require('express');
var db = require('../models');

var router = express.Router();

router.route('/')
	.get(getEntries)
	.post(postEntry);

router.route('/:entryId')
	.delete(removeEntry)
	.put(updateEntry);

function getEntries(req, res) {
	db.Entry.find().then(function(entries) {
		res.json(entries);
	}).catch(function(error) {
		res.send(error);
	});
}

function postEntry(req, res) {
	db.Entry.create(req.body).then(function(newEntry) {
		res.status(201).json(newEntry);
	}).catch(function(error) {
		res.send(error);
	});
}

function removeEntry(req, res) {
	db.Entry.remove({_id: req.params.entryId}).then(function(entry) {
		res.json({message: 'Successfully deleted.'});
	}).catch(function(error) {
		res.send(error);
	});
}

function updateEntry(req, res) {
	db.Entry.findOneAndUpdate({_id: req.params.entryId}, req.body)
		.then(function(entry) {
			res.json(entry);
		}).catch(function(error) {
			res.send(error);
		});
}

module.exports = router;
