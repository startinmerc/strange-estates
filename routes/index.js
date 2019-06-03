var express = require("express");
var router  = express.Router();
var User = ("../models/user");
var passport = require("passport");

// Register
router.get("/register", function(req,res){
	res.render("register");
});

// Create route
router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if (err) {console.log(err); return res.render("register")}
		passport.authenticate("local")(req,res,function(){
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
	res.redirect("/listings");
});

// Middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;