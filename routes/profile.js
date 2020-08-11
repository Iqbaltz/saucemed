var express = require('express');
var router = express.Router();
var db = require('../models');
var middleware = require('../config/middleware');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

router.get('/:id', middleware.isLoggedIn, function(req, res) {
	db.User
		.findOne({
			include: [ { model: db.Post } ],
			where: { id: req.params.id }
		})
		.then(function(user) {
			var posts = user.Posts;
			res.render('profile/show', { post: posts, user: user });
		});
});

router.get('/:id/edit', middleware.checkUserOwnership, function(req, res) {
	res.render('profile/edit', { user: user });
});

router.put('/:id', [ upload.single('image'), middleware.checkUserOwnership ], function(req, res) {
	db.User
		.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(function(user) {
			if (user) {
				user
					.update({
						profile_pict: req.file.path,
						first_name: req.body.fname,
						last_name: req.body.lname
					})
					.then(function(user) {
						res.redirect('/profile/' + req.params.id);
					})
					.catch(function(err) {
						res.redirect('/');
					});
			}
		});
});

module.exports = router;
