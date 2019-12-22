// requiring neccesary npm packages
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    session         = require("express-session"),
    passport        = require("./config/passport"),
    methodOverride  = require("method-override");

// Setting up port and requiring models for syncing
var port    = process.env.PORT || 8080;
var db      = require("./models")

// Creating express app and configuring middleware needed for authentication
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/index.js")(app);
// require("./routes/photo.js")(app);


db.sequelize.sync().then(function () {
    app.listen(port, function(){
        console.log("Listening on port %s. Visit http://localhost:%s/ in your browser", port, port)
    });
});


