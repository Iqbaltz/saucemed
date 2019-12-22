var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.user){
        return next();
    }
    return res.redirect("/login")
}

module.exports = middlewareObj;

