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
	image: String,
	description: String
});

var Entry = mongoose.model("Entry", entrySchema);


// let list = [
// 	{name: "One", image: "https://source.unsplash.com/VhpDAKvVA-Q", description: "description one"},
// 	{name: "Two", image: "https://source.unsplash.com/uh0u8OH4zuE", description: "description two"},
// 	{name: "Three", image: "https://source.unsplash.com/dqZGqFU4Usk", description: "description three"},
// 	{name: "Four", image: "https://source.unsplash.com/07t5vZoW9n8", description: "description four"}
// 	];

// list.forEach(function(v){
// 	Entry.create(v,function(err,entry){
// 		if (err) {console.log(err)}
// 		else {
// 			console.log("Added");
// 			console.log(entry);
// 		}
// 	});
// });

// ROUTES

app.get("/", function(req,res){
	res.render("landing");
});

app.get("/listings", function(req,res){
	Entry.find({}, function(err,allEntries){
		if (err) {console.log(err)}
		else {
			res.render("index", {allEntries:allEntries});
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
	Entry.create(newListing, function(err,newlyCreated){
		if (err) {console.log(err)}
		else {
				res.redirect("/listings");
		}
	})
});

app.get(("/listings/:id"), function(req,res){
	Entry.findById(req.params.id, function(err,foundEntry){
		if (err) {console.log(err)}
		else {
			res.render("show", {entry:foundEntry});
		}
	});

})


app.listen(3000, process.env.IP, function(){
	console.log("Server Running")
});