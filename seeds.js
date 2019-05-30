var mongoose 	= require("mongoose"),
	Listing 	= require("./models/listing"),
	Comment 	= require("./models/comment");

var list = [
	{name: "One", image: "https://source.unsplash.com/VhpDAKvVA-Q", description: "description one"},
	{name: "Two", image: "https://source.unsplash.com/uh0u8OH4zuE", description: "description two"},
	{name: "Three", image: "https://source.unsplash.com/dqZGqFU4Usk", description: "description three"},
	{name: "Four", image: "https://source.unsplash.com/07t5vZoW9n8", description: "description four"}
	];

function seedDB(){
	Listing.deleteMany({}, function(err){
		if (err) {
			console.log(err)
		} else {
			Comment.deleteMany({}, (err) => {if (err) {console.log(err)}});
		}
		list.forEach(function(seed){
			Listing.create(seed,function(err,listing){
				if (err) {
					console.log(err)
				} else {
					console.log("Added Listing");
					Comment.create(
						{
							text: "comment", 
							author:"author"
						}, function(err,comment){
							if (err) {
								console.log(err)
							} else {
								listing.comments.push(comment);
								listing.save();
								console.log("Added Comment")
							}
						});
					}
			});
		});
	});
}

module.exports = seedDB;