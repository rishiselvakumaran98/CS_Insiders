var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User    = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

router.get("/about", (req, res)=>{
    res.render("about");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

router.get("/my-profile", function(req, res){
   res.render("my-profile", {page: 'register'}); 
});

//handle sign up logic
router.post("/register", function(req, res){
  var newUser = new User({name: req.body.name, username: req.body.username});
  if(req.body.adminCode === process.env.ADMIN_CODE) {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("register", {error: err.message});
      }
      passport.authenticate("local")(req, res, function(){
         req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.name);
         res.redirect(req.session.returnTo || '/blogs');
        delete req.session.returnTo; 
      });
  });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        //successRedirect: "/blogs",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to CS Insiders!'
    }), function(req, res){
          res.redirect(req.session.returnTo || '/blogs');
          delete req.session.returnTo;
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Thanks, See you later!");
   res.redirect("/blogs");
});

module.exports = router;