var express		 = require("express"),
	app			 = express(),
	bodyParser	 = require("body-parser"),
	mongoose	 = require("mongoose"),
	Listing 	 = require("./models/listing"),
	seedDB		 = require("./seeds");

seedDB();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/strange_estates");
// mongoose.connect("mongodb+srv://STM:<password>@cluster0-c9k9l.mongodb.net/test?retryWrites=true")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA



// ROUTES

app.get("/", function(req,res){
	res.render("landing");
});

app.get("/listings", function(req,res){
	Listing.find({}, function(err,allListings){
		if (err) {console.log(err)}
		else {
			res.render("index", {allListings:allListings});
		}
	});
});

app.get("/listings/new", function(req,res){
	res.render("new");
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
	Listing.findById(req.params.id, function(err,foundListing){
		if (err) {console.log(err)}
		else {
			res.render("show", {listing:foundListing});
		}
	});

})


app.listen(3000, process.env.IP, function(){
	console.log("Server Running")
});