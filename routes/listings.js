var express = require("express");
var router  = express.Router();
var Listing = require("../models/listing");
var Comment = require("../models/comment");

// Index Route
router.get("/", function(req,res){
	Listing.find({}, function(err,allListings){
		if (err) {console.log(err)}
		else {
			res.render("listings/index", {allListings:allListings});
		}
	});
});


// New Route
router.get("/new", isLoggedIn, function(req,res){
	res.render("listings/new");
});

// Create Route
router.post("/", isLoggedIn, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newListing = {name: name, image: image, description:desc, author:author};
	Listing.create(newListing, function(err,newListing){
		if (err) {console.log(err)}
		else {
			res.redirect("/listings");
		}
	})
});

// Show Route
router.get(("/:id"), function(req,res){
	Listing.findById(req.params.id).populate("comments").exec(function(err,foundListing){
		if (err) {console.log(err)}
		else {res.render("listings/show", {listing:foundListing});}
	});
});

// Edit route
router.get("/:id/edit", function(req,res){
	Listing.findById(req.params.id, function(err,foundListing){
		if (err) {console.log(err)}
		else {res.render("listings/edit", {listing:foundListing});}
	});
});

// Update Route
router.put("/:id", function(req,res){
	Listing.findByIdAndUpdate(req.params.id, req.body.listing, function(err, updatedListing){
		if (err) {res.redirect("/listings")}
		else {res.redirect("/listings/"+req.params.id);}
	});
});

// Destroy route
router.delete("/:id", (req, res) => {
    Listing.findByIdAndRemove(req.params.id, (err, removedListing) => {
        if (err) {
            console.log(err);
        }
        Comment.deleteMany( {_id: { $in: removedListing.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect("/listings");
        });
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