var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

    app.get("/", function(req,res){
        res.send("home page")
    });

    app.get("/register", function(req,res){
        res.send("register page")
    });

    app.post("/register", function(req,res){
        res.send("post page")
    });

    app.get("/login", function(req,res){
        res.send("login page")
    })

    app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
    });

    app.get("/logout", function(req, res){
        req.logout();
        res.redirect("/");
     });

}