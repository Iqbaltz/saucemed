var db = require('../../models');
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.user){
        return next();
    }
    return res.redirect("/login")
};

middlewareObj.checkPostOwnership = function(req, res, next) {
    if(req.user){
        db.Post.findOne({
            where: {
              id: req.params.id
            }
          }).then(function(post_ini) {
            post = post_ini.dataValues
            if(post.user_id === req.user.id){
                return next();
            } else{
                res.redirect("back")
            }
          }).catch(function(){
            res.redirect('back')
          })
    } else{
      return res.redirect("/login")
    }
};

middlewareObj.checkUserOwnership = function(req, res, next) {
    if(req.user){
        db.User.findOne({
            where: {
              id: req.params.id
            }
          }).then(function(user_ini) {
            user = user_ini.dataValues
            if(user.id === req.user.id){
                return next();
            } else{
                res.redirect("back")
            }
          }).catch(function(){
            res.redirect('back')
          })
    }
    else{
        return res.redirect("/login");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if(req.user){
      db.Comment.findOne({
        where: {
          id: req.params.comment_id
        }
      }).then(function(comment) {
        if(comment.user_id === req.user.id){
          return next()
        } else{
          res.redirect("back")
        }
      }).catch(function() {
        res.redirect("back")
      })
  }else{
    return res.redirect("/login")
  }
}

module.exports = middlewareObj;

