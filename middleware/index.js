var Listing = require("../models/listing");
var Review = require("../models/review");

var middlewareObj = {};

middlewareObj.checkListingOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Listing.findById(req.params.id, function(err,foundListing){
			if (err || !foundListing) {
				req.flash("error", "Listing not found");
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

middlewareObj.checkReviewOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Review.findById(req.params.review_id, function(err,foundReview){
			if (err || !foundReview) {
				req.flash("error", "Review not found");
				res.redirect("back")
			}
			else {
				if (foundReview.author.id.equals(req.user.id) || req.user.isAdmin) {
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

middlewareObj.checkReviewExistence = function(req,res,next){
	if (req.isAuthenticated()) {
		Listing.findById(req.params.id).populate("reviews").exec(function(err,foundListing){
			if (err || !foundListing) {
				req.flash("err", "Listing not found.");
				return res.redirect("back");
			}
			let foundReview = foundListing.reviews.some(function(review){
				return review.author.id.equals(req.user._id);
			});
			if (foundReview) {
				req.flash("error", "You have already posted a review");
				return res.redirect("/listings/" + foundListing._id);
			}
			next();
		});
	} else {
		req.flash("error", "Please log in first");
		res.redirect("back");
	}
}

middlewareObj.calculateAverage= function(reviews){
	if(reviews.length === 0) {
		return 0;
	}
	let sum = 0;
	reviews.forEach(function(review){
		sum += review.rating;
	});
	return sum / reviews.length;
}

middlewareObj.escapeRegex = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = middlewareObj;