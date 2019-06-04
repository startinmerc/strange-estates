var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var passport = require("passport");

// Register
router.get("/register", function(req,res){
	res.render("register");
});

// Create route
router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if (err) {
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success", "Welcome to Strange Estates, " + user.username)
			res.redirect("/listings");
		});
	});
});

// Login Route
router.get("/login", function(req,res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/listings",
	failureRedirect: "/login"
	}), function(req,res){
});

// Logout Route
router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "Logged out")
	res.redirect("/listings");
});

module.exports = router;