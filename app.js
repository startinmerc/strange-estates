var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req,res){
	res.render("landing");
});

app.get("/listings", function(req,res){
	var listings = [
		{name: "One", image: "https://source.unsplash.com/VhpDAKvVA-Q"},
		{name: "Two", image: "https://source.unsplash.com/uh0u8OH4zuE"},
		{name: "Three", image: "https://source.unsplash.com/dqZGqFU4Usk"}
	];
	res.render("listings", {listings:listings});
});

app.listen(3000, process.env.IP, function(){
	console.log("Server Running")
});