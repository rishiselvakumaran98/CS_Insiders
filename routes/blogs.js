var express = require("express");
var router  = express.Router();
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var middleware = require("../middleware"); // will automatically take index.js as home file
const htmlToText = require('html-to-text');
var { isLoggedIn, checkUserBlog, checkUserComment, isAdmin} = middleware;

// The escapeRegex function is used for search feature to search for blogs
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//INDEX - show all BLOG
router.get("/", (req, res)=> {
  if(req.query.search && req.xhr) { //
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all blogs from DB
      Blog.find({title: regex}, (err, allBlogs)=> {
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
              res.render("blogs/index",{blogs: allBlogs, page: 'blogs', htmlToText: htmlToText});
            }
         }
      });
  }
});


//CREATE - add new BLOG to DB
router.post("/", isLoggedIn, (req, res)=> {
    // get data from form and add to BLOG array
    var title = req.body.title;
    var image = req.body.image;
    var description = req.sanitize(req.body.description); //req.sanitize(req.body.description);
    var topic = req.body.topic;
    var author = {
        id: req.user._id,
        name: req.user.name,
        username: req.user.username
    }
    var newBlog = {title: title, image: image, description: description, author: author, topic: topic}
    // Create a new BLOG and save to DB
    Blog.create(newBlog, (err, newlyCreated)=> {
        if(err){
            console.log(err);
            req.flash("error", err.message);
        } else {
            //redirect back to BLOG page
            req.flash("success", "Success! You have created a new Blog")
            res.redirect("/blogs");
        }
    });
});

// Route for accessing user's own posts
router.get("/my-posts", isLoggedIn, (req, res)=> {
  Blog.find({}, (err, allBlog)=> {
    if(err){
      req.flash("error", "Sorry, you do not have permission!");
    // }else if(foundBlog.author.id.equals(req.user._id) || req.user.isAdmin){
    //   req.blog = foundBlog;
    } else{
      res.render("blogs/user_posts", {blogs: allBlog, user: req.user, htmlToText: htmlToText});
    }
  }); 
});

// Route for accessing posts liked by User
router.get("/liked-posts", isLoggedIn, (req, res)=> {
  Blog.find({}, (err, allBlog)=> {
    if(err){
      req.flash("error", "Sorry, you do not have permission!");
    // }else if(foundBlog.author.id.equals(req.user._id) || req.user.isAdmin){
    //   req.blog = foundBlog;
    } else{
      res.render("blogs/liked_posts", {blogs: allBlog, user: req.user, htmlToText: htmlToText});
    }
  }); 
});

//Route for likes on blog
router.post("/:id/like", isLoggedIn, (req, res)=> {
  Blog.findById(req.params.id, (err, foundBlog)=> {
      if (err) {
          console.log(err);
          return res.redirect("/blogs");
      }

      // check if req.user._id exists in foundBlog.likes
      var foundUserLike = foundBlog.likes.some((like)=> { 
        //  The some() method will iterate over the foundCampground.likes array, 
        //  calling equals() on each element (ObjectId) to see if it matches req.user._id 
        //  and stop as soon as it finds a match. If it finds a match it returns true, otherwise 
        //  it returns false, and we store that boolean value to the foundUserLike variable.
          return like.equals(req.user._id);
      });

      if (foundUserLike) {
          // user already liked, removing like
          foundBlog.likes.pull(req.user._id);
      } else {
          // adding the new user like
          foundBlog.likes.push(req.user);
      }

      foundBlog.save((err)=> {
          if (err) {
              console.log(err);
              return res.redirect("/blogs");
          }
          return res.redirect("/blogs/" + foundBlog._id);
      });
  });
});

//NEW - show form to create new BLOG
router.get("/new", isLoggedIn, (req, res)=>{
   res.render("blogs/new"); 
});

// SHOW - shows more info about one BLOG
router.get("/:id", (req, res)=>{
    //find the BLOG with provided ID
    Blog.findById(req.params.id).populate("comments likes").exec((err, foundBlog)=>{
        if(err || !foundBlog){
            console.log(err);
            req.flash('error', 'Sorry, that blog does not exist!');
            return res.redirect('/blogs');
        } else {
            //render show template with that BLOG
            res.render("blogs/show", {blog: foundBlog});
        }
    });
});



// EDIT BLOG ROUTE
router.get("/:id/edit", isLoggedIn, checkUserBlog, (req, res)=>{
  res.render("blogs/edit", {blog: req.blog});
    // Blog.findById(req.params.id, function(err, foundBlog){
    //   if(err){
    //     res.redirect("/blogs/:id");
    //   } else{
    //     res.render("blogs/edit", {blog: foundBlog});
    //   }
    // });
});

// UPDATE BLOG ROUTE
router.put("/:id", (req, res)=>{
    // find and update the correct BLOG
    var newInfo = {title: req.body.title, image: req.body.image, body: req.body.description, topic: req.body.topic}
    Blog.findByIdAndUpdate(req.params.id, {$set: newInfo}, (err, updatedBlog)=>{
       if(err){
           req.flash("error", err.message);
          res.redirect("back");
       } else {
           //redirect somewhere(show page)
           req.flash("success","Successfully Updated Blog!");
           res.redirect("/blogs/" + req.params.id);
       }
    });
});

// DESTROY BLOG ROUTE
router.delete("/:id", isLoggedIn, checkUserBlog, (req, res)=>{
   Comment.remove({
      _id: {
        $in: req.blog.comments
      }
    }, (err)=> {
      if(err) {
          req.flash('error', err.message);
          res.redirect('/');
      } else {
          req.blog.remove((err)=> {
            if(err) {
                req.flash('error', err.message);
                return res.redirect('/');
            }
            req.flash('error', 'Blog deleted!');
            res.redirect('/blogs');
          });
      }
    })
});



module.exports = router;
