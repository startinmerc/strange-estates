var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var passport = require("passport");

// Landing Page
router.get("/", (req,res) => {
	res.render("landing");
});

// About Page
router.get("/about", (req,res) => {
	User.find({isAdmin: true}, (err,admins) => {
		if (err) {
			req.flash("error", "Database error");
			res.redirect("back");
		} else {
			res.render("about", {admins: admins});
		}
	});
});


// Register
router.get("/register", function(req,res){
	res.render("register");
});

// Create route
router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	if(req.body.adminCode === "spookyghost"){
		newUser.isAdmin = true;
	}
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
	successFlash: "Welcome back",
	failureRedirect: "/login",
	failureFlash: true
	}), function(req,res){
});

// Logout Route
router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "Logged out")
	res.redirect("/listings");
});

module.exports = router;