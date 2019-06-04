var express = require("express");
var router  = express.Router({mergeParams: true});
var Listing = require("../models/listing");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Create new comment
router.get("/new", middleware.isLoggedIn, function(req,res){
	Listing.findById(req.params.id, function(err,listing){
		if (err) {
			req.flash("error", "Database error");
			res.redirect("back");
		} else {
			res.render("comments/new", {listing:listing});
		}
	});
});

// Post comment
router.post("/", middleware.isLoggedIn, function(req,res){
	Listing.findById(req.params.id, function(err,listing){
		if (err) {
			req.flash("error", "Database error");
			res.redirect("/listings");
		} else {
			Comment.create(req.body.comment, function(err,comment){
				if (err) {
					req.flash("error", "Database error");
					res.redirect("back");
				} else {
					// add username & id
					comment.author.username = req.user.username;
					comment.author.id = req.user._id;
					comment.save();
					listing.comments.push(comment);
					listing.save();
					req.flash("success", "Comment posted");
					res.redirect("/listings/" + listing._id);
				}
			});
		}
	});
});

// Edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
	Listing.findById(req.params.id, function(err, foundListing){
		if(err || !foundListing){
			req.flash("error", "Listing not found");
			res.redirect("back");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (err || !foundComment) {
				req.flash("error", "Database error");
				res.redirect("back");
			} else {
				res.render("comments/edit", {listing_id: req.params.id, comment: foundComment});
			}
		});
	})
});

// Update comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err || !updatedComment) {
			req.flash("error", "Database error");
			res.redirect("back");
		} else {
			req.flash("success", "Comment updated");
			res.redirect("/listings/" + req.params.id);
		}
	});
});

// Destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			req.flash("error", "Database error");
			res.redirect("back")
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/listings/" + req.params.id)
		}
	});
});

module.exports = router;