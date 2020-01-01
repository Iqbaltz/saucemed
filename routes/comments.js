var express = require("express");
var router = express.Router({mergeParams: true});
var db = require("../models");
var middleware = require("../config/middleware");

router.post("/",middleware.isLoggedIn, function(req, res) {
    db.Comment.create({
        user_id: req.user.id,
        post_id: req.params.id,
        comment: req.body.comment
      }).then(function() {
        res.redirect("/post/"+ req.params.id);
      }).catch(function(err) {
        console.log(err)
      });
    
})

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  db.Comment.destroy({
    where: {
      id: req.params.comment_id
    }
  }).then(function() {
    res.redirect("/post/"+ req.params.id)
  }).catch(function(err){
    res.redirect("back")
  });
})

module.exports = router