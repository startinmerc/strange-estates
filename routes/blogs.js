var express = require("express");
var router  = express.Router({mergeParams: true});
var Blog = require("../models/blog");
var middleware = require("../middleware");

//Index Route
router.get("/", function(req,res){
	Blog.find({}, function(err,foundBlogs){
		if (err) {
			req.flash("error", err.message);
			res.redirect("back");
		} else {
			res.render("blog/index", {foundBlogs:foundBlogs});
		}
	});
});

//New Route
router.get("/new", middleware.isLoggedInAdmin, function(req,res){
	res.render("blog/new");
});

// Create Route
router.post("/", middleware.isLoggedInAdmin, function(req,res){
	Blog.create(req.body.blogPost, function(err,blogPost){
		if(err){
			req.flash("error", err.message);
			return res.redirect("back");
		}
		blogPost.author.username = req.user.username;
		blogPost.author.id = req.user._id;
		req.flash("success", "Blog post created");
		res.redirect("/blog");
	});
});

// Show Route
router.get(("/:id"), function(req,res){
	Blog.findById(req.params.id).exec(function(err,foundPost){
		if (err || !foundPost) {
			req.flash("error", "Blog post not found");
			res.redirect("back");
		} else {
			res.render("blog/show", {post:foundPost});
		}
	});
});

module.exports = router;