var express = require("express");
var router  = express.Router({mergeParams: true});
var Listing = require("../models/listing");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Index
// Shows all comments for a site, to be replaced by dropdown in listing show page
router.get("/", function(req,res){
	Listing.findById(req.params.id).populate({
		path: "comments",
		options: {
			sort: {createdAt: -1}
		}
	}).exec(function(err, listing) {
		if(err || !listing){
			req.flash("error", err.message);
			return res.redirect("back");
		}
		res.render("comments/index", {listing: listing});
	});
});


// Create new comment
router.get("/new", middleware.isLoggedIn, middleware.checkCommentExistence, function(req,res){
	Listing.findById(req.params.id, function(err,listing){
		if (err) {
			req.flash("error", err.message);
			res.redirect("back");
		} else {
			res.render("comments/new", {listing:listing});
		}
	});
});

// Post comment
router.post("/", middleware.isLoggedIn, middleware.checkCommentExistence, function(req,res){
	Listing.findById(req.params.id).populate("comments").exec(function(err,foundListing){
		if (err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}
		Comment.create(req.body.comment, function(err,comment){
			if (err) {
				req.flash("error", err.message);
				return res.redirect("back");
			} 
			comment.author.username = req.user.username;
			comment.author.id = req.user._id;
			comment.listing = foundListing;
			comment.save();
			foundListing.comments.push(comment);
			foundListing.rating = middleware.calculateAverage(foundListing.comments);
			foundListing.save();
			req.flash("success", "Comment posted");
			res.redirect("/listings/" + foundListing._id);
		});
	});
});

// Edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
	Listing.findById(req.params.id, function(err, foundListing){
		if(err || !foundListing){
			req.flash("error", err.message);
			res.redirect("back");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (err || !foundComment) {
				req.flash("error", err.message);
				res.redirect("back");
			} else {
				res.render("comments/edit", {listing: foundListing, comment: foundComment});
			}
		});
	})
});

// Update comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, {new: true}, function(err, updatedComment){
		if (err || !updatedComment) {
			req.flash("error", err.message);
			return res.redirect("back");
		}
		Listing.findById(req.params.id).populate("comments").exec(function(err,foundListing){
			if (err || !foundListing) {
				req.flash("error", err.message);
				return res.redirect("back");
			}
			foundListing.rating = middleware.calculateAverage(foundListing.comments);
			foundListing.save();
			req.flash("success", "Comment updated");
			res.redirect("/listings/" + req.params.id);
		});
	});
});

// Destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			req.flash("error", err.message);
			return res.redirect("back")
		}
		// $pull removes the deleted comment's reference from the related listing
		Listing.findByIdAndUpdate(req.params.id, {$pull: {comments: req.params.comment_id}}, {new: true})
		.populate("comments").exec(function(err,foundListing){
			if (err || !foundListing) {
				req.flash("error", err.message);
				return res.redirect("back");
			}
			foundListing.rating = middleware.calculateAverage(foundListing.comments);
			foundListing.save();
			req.flash("success", "Comment deleted");
			res.redirect("/listings/" + req.params.id);
		});
	});
});

module.exports = router;