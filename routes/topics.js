var express = require("express");
var router  = express.Router();
var Blog = require("../models/blog");
const htmlToText = require('html-to-text');
//var Comment = require("../models/comment");
//var middleware = require("../middleware"); // will automatically take index.js as home file
//var { isLoggedIn, checkUserBlog, checkUserComment, isAdmin} = middleware;


// The escapeRegex function is used for search feature to search for blogs
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Route for Topic Web Development
router.get("/web-development", function(req, res){
  if(req.query.search && req.xhr) { //
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all blogs from DB
      Blog.find({title: regex}, function(err, allBlogs){
         if(err){
            console.log(err);
            req.flash("error", err.message);
         } else {
            res.status(200).json(allBlogs);
         }
      });
  } else {
      // Get all blogs from DB
      Blog.find({}, function(err, allBlogs){
         if(err){
             console.log(err);
         } else {
            if(req.xhr) {
              res.json(allBlogs);
            } else {
              res.render("blogs/topics",{blogs: allBlogs, page: 'blogs', title: 'web-development', htmlToText: htmlToText});
            }
         }
      });
  }
});

// Route for AI Topic
router.get("/AI%20and/or%20ML", function(req, res){
  if(req.query.search && req.xhr) { //
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all blogs from DB
      Blog.find({title: regex}, function(err, allBlogs){
         if(err){
            console.log(err);
            req.flash("error", err.message);
         } else {
            res.status(200).json(allBlogs);
         }
      });
  } else {
      // Get all blogs from DB
      Blog.find({}, function(err, allBlogs){
         if(err){
             console.log(err);
         } else {
            if(req.xhr) {
              res.json(allBlogs);
            } else {
              res.render("blogs/topics",{blogs: allBlogs, page: 'blogs', title: 'AI\ and/or\ ML', htmlToText: htmlToText});
            }
         }
      });
  }
});

// Route for Data-science Topic
router.get("/data-science", function(req, res){
  if(req.query.search && req.xhr) { //
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all blogs from DB
      Blog.find({title: regex}, function(err, allBlogs){
         if(err){
            console.log(err);
            req.flash("error", err.message);
         } else {
            res.status(200).json(allBlogs);
         }
      });
  } else {
      // Get all blogs from DB
      Blog.find({}, function(err, allBlogs){
         if(err){
             console.log(err);
         } else {
            if(req.xhr) {
              res.json(allBlogs);
            } else {
              res.render("blogs/topics",{blogs: allBlogs, page: 'blogs', title: 'data-science', htmlToText: htmlToText});
            }
         }
      });
  }
});

// Route for intern topic

router.get("/internship-advice", function(req, res){
  if(req.query.search && req.xhr) { //
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all blogs from DB
      Blog.find({title: regex}, function(err, allBlogs){
         if(err){
            console.log(err);
            req.flash("error", err.message);
         } else {
            res.status(200).json(allBlogs);
         }
      });
  } else {
      // Get all blogs from DB
      Blog.find({}, function(err, allBlogs){
         if(err){
             console.log(err);
         } else {
            if(req.xhr) {
              res.json(allBlogs);
            } else {
              res.render("blogs/topics",{blogs: allBlogs, page: 'blogs', title: 'internship-advice', htmlToText: htmlToText});
            }
         }
      });
  }
});


module.exports = router;