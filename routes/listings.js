var express = require("express");
var router  = express.Router();
var Listing = require("../models/listing");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Index Route
router.get("/", function(req,res){
	let search = {},
			term = "";
	if (req.query.search) {
		search = {name: new RegExp(middleware.escapeRegex(req.query.search), "gi")};
		term = (search.name.toString().slice(1,-3));
	}
	Listing.find(search, function(err,foundListings){
		if (err) {
			req.flash("error", err.message);
			res.redirect("back");
		} else if (foundListings.length === 0) {
			req.flash("error", "No listings found for " + term);
			res.redirect("listings");
		}	else {
			res.render("listings/index", {foundListings:foundListings, term:term});
		}
	});
});


// New Route
router.get("/new", middleware.isLoggedInAdmin, function(req,res){
	res.render("listings/new");
});

// Create Route
router.post("/", middleware.isLoggedInAdmin, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var price = req.body.price;
	var newListing = {name: name, price:price, image: image, description:desc, author:author};
	Listing.create(newListing, function(err,newListing){
		if (err) {
			req.flash("error", err.message);
			res.redirect("/listings");
		} else {
			req.flash("success", "Listing created");
			res.redirect("/listings");
		}
	});
});

// Show Route - Main
router.get(("/:id"), function(req,res){
	Listing.findById(req.params.id).populate("comments").populate({
		path: "comments",
		options: {sort: {createdAt: -1}}
	}).exec(function(err,foundListing){
		if (err || !foundListing) {
			req.flash("error", "Listing not found");
			res.redirect("back");
		} else {
			res.render("listings/show", {listing:foundListing});
		}
	});
});

// Show Route - Gallery
router.get(("/:id/gallery"), function(req,res){
	Listing.findById(req.params.id).populate("comments").exec(function(err,foundListing){
		if (err || !foundListing) {
			req.flash("error", "Listing not found");
			res.redirect("back");
		} else {
			res.render("listings/show-gallery", {listing:foundListing});
		}
	});
});

// Show Route - Features
router.get(("/:id/features"), function(req,res){
	Listing.findById(req.params.id).populate("comments").exec(function(err,foundListing){
		if (err || !foundListing) {
			req.flash("error", "Listing not found");
			res.redirect("back");
		} else {
			res.render("listings/show-features", {listing:foundListing});
		}
	});
});

// Edit route
router.get("/:id/edit", middleware.checkListingOwnership, function(req,res){
	Listing.findById(req.params.id, function(err,foundListing){
		if (err || !foundListing) {
			req.flash("error", "Listing not found");
			res.redirect("back");
		} else {
			res.render("listings/edit", {listing:foundListing});
		}
	});
});

// Update Route
router.put("/:id", middleware.checkListingOwnership, function(req,res){
	// delete req.body.listing.rating;
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var price = req.body.price;
	var updatedListing = {name: name, price:price, image: image, description:desc};
	Listing.findByIdAndUpdate(req.params.id, updatedListing, function(err, updatedListing){
		if (err) {
			req.flash("error", err.message);
			res.redirect("back");
		} else {
			req.flash("success", "Listing edited");
			res.redirect("/listings/"+req.params.id);
		}
	});
});

// Destroy route
router.delete("/:id", middleware.checkListingOwnership, function(req, res){
    Listing.findByIdAndRemove(req.params.id, function(err, removedListing){
		if (err) {
			req.flash("error", err.message);
			res.redirect("/listings");
        } else {
	        Comment.deleteMany( {_id: { $in: removedListing.comments } }, function(err){
	            if (err) {
	                console.log(err);
	            }
	            req.flash("success", "Listing deleted");
	            res.redirect("/listings");
	        });
	    }
    });
});

module.exports = router;