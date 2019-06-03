var express			= require("express"),
	app				= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	Listing 		= require("./models/listing"),
	seedDB			= require("./seeds"),
	Comment 		= require("./models/comment"),
	User			= require("./models/user");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/strange_estates");
// mongoose.connect("mongodb+srv://STM:<password>@cluster0-c9k9l.mongodb.net/test?retryWrites=true")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

// Passport

app.use(require("express-session")({
	secret: "cats-with-thumbs",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next()
});


// ROUTES

app.get("/", function(req,res){
	res.render("landing");
});

app.get("/listings", function(req,res){

	Listing.find({}, function(err,allListings){
		if (err) {console.log(err)}
		else {
			res.render("listings/index", {allListings:allListings});
		}
	});
});

app.get("/listings/new", function(req,res){
	res.render("listings/new");
});

app.post("/listings", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newListing = {name: name, image: image, description:desc};
	Listing.create(newListing, function(err,newListing){
		if (err) {console.log(err)}
		else {
				res.redirect("/listings");
		}
	})
});

app.get(("/listings/:id"), function(req,res){
	Listing.findById(req.params.id).populate("comments").exec(function(err,foundListing){
		if (err) {console.log(err)}
		else {
			res.render("listings/show", {listing:foundListing});
		}
	});
});

app.get("/listings/:id/comments/new", isLoggedIn, function(req,res){
	Listing.findById(req.params.id, function(err,listing){
		if (err) {console.log(err)}
		else {
			res.render("comments/new", {listing:listing});
		}
	});
});

app.post("/listings/:id/comments", isLoggedIn, function(req,res){
	Listing.findById(req.params.id, function(err,listing){
		if (err) {console.log(err); res.redirect("/listings");}
		else {
			Comment.create(req.body.comment, function(err,comment){
				if (err) {console.log(err)}
				else {
					listing.comments.push(comment);
					listing.save();
					res.redirect("/listings/" + listing._id);
				}
			})
		}
	})
});

app.get("/register", function(req,res){
	res.render("register");
});

app.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if (err) {console.log(err); return res.render("register")}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/listings");
		});
	});
});

app.get("/login", function(req,res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/listings",
	failureRedirect: "/login"
	}), function(req,res){
});

app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/listings");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, process.env.IP, function(){
	console.log("Server Running")
});