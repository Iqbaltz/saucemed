// requiring neccesary npm packages
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	passport = require('./config/passport'),
	methodOverride = require('method-override'),
	flash = require('connect-flash');

//requiring routes
var indexRoutes = require('./routes/index'),
	profileRoutes = require('./routes/profile'),
	postRoutes = require('./routes/posts'),
	commentRoutes = require('./routes/comments');

// Setting up port and requiring models for syncing
var port = process.env.PORT || 3000;
var db = require('./models');

// Creating express app and configuring middleware needed for authentication
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(flash());
app.set('view engine', 'ejs');

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use('/', indexRoutes);
app.use('/profile', profileRoutes);
app.use('/post', postRoutes);
app.use('/post/:id/comments', commentRoutes);

db.sequelize.sync().then(function() {
	app.listen(port, function() {
		console.log('Listening on port %s. Visit http://localhost:%s/ in your browser', port, port);
	});
});
