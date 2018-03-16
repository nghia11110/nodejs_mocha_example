var express = require('express'),
router = express.Router(),
model = require('../models/news');

router.get('/all', function(req, res) {
	model.all(function(err, items) {
		if (err) return res.json({error: "There is a problem"});
		res.json({error: null, news: items})
	})
});

router.post('/create', function(req, res) {
	model.create(req.body.title, req.body.text, function(err, doc) {
		if (err) return res.json({error: "There is a problem"});
		res.json({error: null, news: doc})
	})
});

module.exports = router;