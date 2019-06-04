var Listing = require("../models/listing");
var Comment = require("../models/comment");

var middlewateObj = {};

middlewateObj.checkListingOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Listing.findById(req.params.id, function(err,foundListing){
			if (err) {res.redirect("back")}
			else {
				if (foundListing.author.id.equals(req.user.id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

middlewateObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err,foundComment){
			if (err) {res.redirect("back")}
			else {
				if (foundComment.author.id.equals(req.user.id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

middlewateObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = middlewateObj