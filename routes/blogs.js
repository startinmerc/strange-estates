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
			res.render("blogs/index", {foundBlogs:foundBlogs})
		}
	});
});

module.exports = router;