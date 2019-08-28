var express = require("express");
var router  = express.Router({mergeParams: true});
var Listing = require("../models/listing");
var Review = require("../models/review");
var middleware = require("../middleware");

// Index
// Shows all reviews for a site, to be replaced by dropdown in listing show page
router.get("/", function(req,res){
	Listing.findById(req.params.id).populate({
		path: "reviews",
		options: {
			sort: {createdAt: -1}
		}
	}).exec(function(err, listing) {
		if(err || !listing){
			req.flash("error", err.message);
			return res.redirect("back");
		}
		res.render("reviews/index", {listing: listing});
	});
});


// Create new review
router.get("/new", middleware.isLoggedIn, middleware.checkReviewExistence, function(req,res){
	Listing.findById(req.params.id, function(err,listing){
		if (err) {
			req.flash("error", err.message);
			res.redirect("back");
		} else {
			res.render("reviews/new", {listing:listing});
		}
	});
});

// Post review
router.post("/", middleware.isLoggedIn, middleware.checkReviewExistence, function(req,res){
	Listing.findById(req.params.id).populate("reviews").exec(function(err,foundListing){
		if (err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}
		Review.create(req.body.review, function(err,review){
			if (err) {
				req.flash("error", err.message);
				return res.redirect("back");
			} 
			review.author.username = req.user.username;
			review.author.id = req.user._id;
			review.listing = foundListing;
			review.save();
			foundListing.reviews.push(review);
			foundListing.rating = middleware.calculateAverage(foundListing.reviews);
			foundListing.save();
			req.flash("success", "Review posted");
			res.redirect("/listings/" + foundListing._id);
		});
	});
});

// Edit review
router.get("/:review_id/edit", middleware.checkReviewOwnership, function(req,res){
	Listing.findById(req.params.id, function(err, foundListing){
		if(err || !foundListing){
			req.flash("error", err.message);
			res.redirect("back");
		}
		Review.findById(req.params.review_id, function(err, foundReview){
			if (err || !foundReview) {
				req.flash("error", err.message);
				res.redirect("back");
			} else {
				res.render("reviews/edit", {listing: foundListing, review: foundReview});
			}
		});
	})
});

// Update review
router.put("/:review_id", middleware.checkReviewOwnership, function(req,res){
	Review.findByIdAndUpdate(req.params.review_id, req.body.review, {new: true}, function(err, updatedReview){
		if (err || !updatedReview) {
			req.flash("error", err.message);
			return res.redirect("back");
		}
		Listing.findById(req.params.id).populate("reviews").exec(function(err,foundListing){
			if (err || !foundListing) {
				req.flash("error", err.message);
				return res.redirect("back");
			}
			foundListing.rating = middleware.calculateAverage(foundListing.reviews);
			foundListing.save();
			req.flash("success", "Review updated");
			res.redirect("/listings/" + req.params.id);
		});
	});
});

// Destroy route
router.delete("/:review_id", middleware.checkReviewOwnership, function(req,res){
	Review.findByIdAndRemove(req.params.review_id, function(err){
		if (err) {
			req.flash("error", err.message);
			return res.redirect("back")
		}
		// $pull removes the deleted review's reference from the related listing
		Listing.findByIdAndUpdate(req.params.id, {$pull: {reviews: req.params.review_id}}, {new: true})
		.populate("reviews").exec(function(err,foundListing){
			if (err || !foundListing) {
				req.flash("error", err.message);
				return res.redirect("back");
			}
			foundListing.rating = middleware.calculateAverage(foundListing.reviews);
			foundListing.save();
			req.flash("success", "Review deleted");
			res.redirect("/listings/" + req.params.id);
		});
	});
});

module.exports = router;