var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passport');

router.get('/', function(req, res) {
	db.Post
		.findAll({
			include: [ { model: db.User } ],
			order: [ [ 'id', 'DESC' ] ]
		})
		.then(function(posts) {
			res.render('home', { post: posts });
		});
});

router.get('/register', function(req, res) {
	res.render('register');
});

router.post('/register', function(req, res) {
	db.User
		.create({
			first_name: req.body.fname,
			last_name: req.body.lname,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		})
		.then(function() {
			res.redirect(307, '/login');
		})
		.catch(function(err) {
			console.log(err);
			res.redirect('register');
			// res.status(422).json(err.errors[0].message);
		});
});

router.get('/login', function(req, res) {
	res.render('login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}),
	function(req, res) {}
);

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
