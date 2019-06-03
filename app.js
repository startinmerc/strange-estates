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

var commentRoutes	= require("./routes/comments"),
	listingRoutes	= require("./routes/listings"),
	authRoutes 		= require("./routes/index");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/strange_estates");
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

app.get("/", function(req,res){
	res.render("landing");
});

// Requiring routes
app.use("/", authRoutes);
app.use("/listings/:id/comments", commentRoutes);
app.use("/listings", listingRoutes);

app.listen(3000, process.env.IP, function(){
	console.log("Server Running")
});