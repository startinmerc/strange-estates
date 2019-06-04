var express = require("express");
var router  = express.Router({mergeParams: true});
var Listing = require("../models/listing");
var Comment = require("../models/comment");

// Create new comment
router.get("/new", isLoggedIn, function(req,res){
	Listing.findById(req.params.id, function(err,listing){
		if (err) {console.log(err)}
		else {
			res.render("comments/new", {listing:listing});
		}
	});
});

// Post comment
router.post("/", isLoggedIn, function(req,res){
	Listing.findById(req.params.id, function(err,listing){
		if (err) {console.log(err); res.redirect("/listings");}
		else {
			Comment.create(req.body.comment, function(err,comment){
				if (err) {console.log(err)}
				else {
					// add username & id
					comment.author.username = req.user.username;
					comment.author.id = req.user._id;
					comment.save();
					listing.comments.push(comment);
					listing.save();
					res.redirect("/listings/" + listing._id);
				}
			})
		}
	})
});

// Edit comment
router.get("/:comment_id/edit", function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if (err) {console.log(err)}
		else {
			res.render("comments/edit", {listing_id: req.params.id, comment: foundComment});
		}
	});
});

// Update comment
router.put("/:comment_id", function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err) {console.log(err)}
		else {
			res.redirect("/listings/" + req.params.id)
		}
	})
});

// Middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;