require('dotenv').config()

// ======================VARIABLES======================

const express		= require("express"),
	app				= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	methodOverride 	= require("method-override"),
	flash			= require("connect-flash"),

	Review 		= require("./models/review"),
	User			= require("./models/user"),
	Listing 	= require("./models/listing"),
	Blog 			= require("./models/blog"),

	reviewRoutes	= require("./routes/reviews"),
	listingRoutes	= require("./routes/listings"),
	indexRoutes		= require("./routes/index"),
	blogRoutes		= require("./routes/blogs")

	seedDB			= require("./seeds");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// mongoose.connect("mongodb://localhost/strange_estates");
mongoose.connect("mongodb+srv://STM:"+process.env.STM+"@cluster0-c9k9l.mongodb.net/test?retryWrites=true&w=majority")
.then(()=> {
	console.log("CONNECTED");
}).catch(err => {
	console.log(err.message);
});

// ===================EXPRESS CONFIG====================

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static('public/images'))

// =====================SEEDING DB======================

seedDB();

// ======================PASSPORT=======================

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

app.use((req,res,next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// =======================ROUTES========================

app.use("/", indexRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/listings", listingRoutes);
app.use("/blog", blogRoutes);

// ====================SERVER LISTEN====================

// app.listen(3000, process.env.IP, () => {
// 	console.log("Server Running")
// });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Running");
});