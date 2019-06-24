var Listing = require("../models/listing");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkListingOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Listing.findById(req.params.id, function(err,foundListing){
			if (err || !foundListing) {
				req.flash("error", "Comment not found");
				res.redirect("back")}
			else {
				if (foundListing.author.id.equals(req.user.id) || req.user.isAdmin) {
					next();
				} else {
					req.flash("Permission denied");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please log in first")
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err,foundComment){
			if (err || !foundComment) {
				req.flash("error", "Listing not found");
				res.redirect("back")
			}
			else {
				if (foundComment.author.id.equals(req.user.id) || req.user.isAdmin) {
					next();
				} else {
					req.flash("Permission denied");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please log in first");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please log in first");
	res.redirect("/login");
}

middlewareObj.isLoggedInAdmin = function(req,res,next){
	if(req.isAuthenticated() && req.user.isAdmin){
		return next();
	}
	req.flash("error", "Please log in as admin first");
	res.redirect("back");
}

middlewareObj.checkCommentExistence = function(req,res,next){
	if (req.isAuthenticated()) {
		Listing.findById(req.params.id).populate("comments").exec(function(err,foundListing){
			if (err || !foundListing) {
				req.flash("err", "Listing not found.");
				return res.redirect("back");
			}
			let foundComment = foundListing.comments.some(function(comment){
				return comment.author.id.equals(req.user._id);
			});
			if (foundComment) {
				req.flash("error", "You have already posted a comment");
				return res.redirect("/listings/" + foundListing._id);
			}
			next();
		});
	} else {
		req.flash("error", "Please log in first");
		res.redirect("back");
	}
}

middlewareObj.calculateAverage= function(comments){
	if(comments.length === 0) {
		return 0;
	}
	let sum = 0;
	comments.forEach(function(comment){
		sum += comment.rating;
	});
	return sum / comments.length;
}

middlewareObj.escapeRegex = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = middlewareObj;