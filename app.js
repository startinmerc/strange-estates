var express		 = require("express"),
	app			 = express(),
	bodyParser	 = require("body-parser"),
	mongoose	 = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/strange_estates");
// mongoose.connect("mongodb+srv://STM:<password>@cluster0-c9k9l.mongodb.net/test?retryWrites=true")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA

var entrySchema = new mongoose.Schema({
	name: String,
	image: String
});

var Entry = mongoose.model("Entry", entrySchema);


// ROUTES

app.get("/", function(req,res){
	res.render("landing");
});

app.get("/listings", function(req,res){
	Entry.find({}, function(err,allEntries){
		if (err) {console.log(err)}
		else {
			res.render("listings", {allEntries:allEntries});
		}
	});
});

app.get("/listings/new", function(req,res){
	res.render("new");
});

app.post("/listings", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newListing = {name: name, image: image};
	Entry.create(newListing, function(err,newlyCreated){
		if (err) {console.log(err)}
		else {
				res.redirect("/listings");
		}
	})
});


app.listen(3000, process.env.IP, function(){
	console.log("Server Running")
});