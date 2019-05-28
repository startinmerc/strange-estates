var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var listings = [
	{name: "One", image: "https://source.unsplash.com/VhpDAKvVA-Q"},
	{name: "Two", image: "https://source.unsplash.com/uh0u8OH4zuE"},
	{name: "Three", image: "https://source.unsplash.com/dqZGqFU4Usk"}
];

app.get("/", function(req,res){
	res.render("landing");
});

app.get("/listings", function(req,res){

	res.render("listings", {listings:listings});
});

app.get("/listings/new", function(req,res){
	res.render("new");
});

app.post("/listings", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newListing = {name: name, image: image};
	listings.push(newListing);
	res.redirect("/listings");
});


app.listen(3000, process.env.IP, function(){
	console.log("Server Running")
});