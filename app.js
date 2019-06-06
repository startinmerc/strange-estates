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

	Comment 		= require("./models/comment"),
	User			= require("./models/user"),
	Listing 		= require("./models/listing"),

	commentRoutes	= require("./routes/comments"),
	listingRoutes	= require("./routes/listings"),
	authRoutes 		= require("./routes/index"),

	seedDB			= require("./seeds");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/strange_estates");
// mongoose.connect("mongodb+srv://STM:"+process.env.STM+"@cluster0-c9k9l.mongodb.net/test?retryWrites=true&w=majority")
// .then(()=> {
// 	console.log("CONNECTED");
// }).catch(err => {
// 	console.log(err.message);
// });

// =====================USING NPMs======================

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

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

app.get("/", (req,res) => {
	res.render("landing");
});
app.use("/", authRoutes);
app.use("/listings/:id/comments", commentRoutes);
app.use("/listings", listingRoutes);

// ====================SERVER LISTEN====================

app.listen(3000, process.env.IP, () => {
	console.log("Server Running")
});

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Server Running");
// });