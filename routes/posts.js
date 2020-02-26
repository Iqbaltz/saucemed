var express = require("express");
var router = express.Router();
var db = require("../models");
var middleware = require("../config/middleware");

// post route for post new image
router.post("/",middleware.isLoggedIn, function(req, res) {
    db.Post.create({
        images: req.body.image,
        name: req.body.name, 
        user_id: req.user.id
      }).then(function() {
        res.redirect("/");
      }).catch(function(err) {
        console.log(err)
      });
})

// new route ,form for add new post
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("post/new")
})

// show route
router.get("/:id", function(req,res) {
    db.Post.findOne({
        include: [
          {model: db.User},
          {model: db.Comment,            
          include : [{model: db.User}]
          }],
          order: [[{model: db.Comment},'createdAt', 'ASC']],
        where: {
          id: req.params.id
        },
      }).then(function(post_ini) {
          var post = post_ini.dataValues
          var comments = post.Comments
          res.render("post/show",{post:post, komentar: comments})
      }).catch(function(err){
        console.log(err)
        res.redirect('/')
      })
});

// GET update route
router.get("/:id/edit",middleware.checkPostOwnership, function(req, res) {
    res.render("post/edit")
})

// PUT update route
router.put("/:id", middleware.checkPostOwnership, function(req, res) {
    db.Post.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(post) {
        if(post){
          post.update({
            images: req.body.image,
            name: req.body.name
          }).then(function(post) {
            res.redirect("/post/"+ req.params.id);
          }).catch(function(err){
            console.log(err)
            res.redirect("/")
          });
        }
      });
});

// DELETE route
router.delete("/:id", middleware.checkPostOwnership,function(req, res) {
    db.Post.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(post) {
        res.redirect("/")
      }).catch(function(err){
        res.redirect("/")
      });
})

module.exports = router;