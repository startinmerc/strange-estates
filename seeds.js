var mongoose 	= require("mongoose"),
	Listing 	= require("./models/listing"),
	Comment 	= require("./models/comment");

var list = [
	{
		name: "Listing One",
		image: "https://source.unsplash.com/VhpDAKvVA-Q",
		description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird.",
		author: {
			id: "5cf7d811373ad70d4d1925ce",
			username: "Agent 1"
		},
		gallery: [
			"https://source.unsplash.com/collection/4945345",
			"https://source.unsplash.com/collection/4945345",
			"https://source.unsplash.com/collection/4945345"
		],
		features: [
			"Feature 1",
			"Feature 2",
			"Feature 3",
			"Feature 4",
			"Feature 5",
			"Feature 6",
			"Feature 7",
			"Feature 8"
		],
		price: "2000"
	},
	{
		name: "Listing Two", 
		image: "https://source.unsplash.com/uh0u8OH4zuE", 
		description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird.",
		author: {
			id: "5cf7d811373ad70d4d1925ce",
			username: "Agent 1"
		},
		gallery: [
			"https://source.unsplash.com/collection/4945345",
			"https://source.unsplash.com/collection/4945345",
			"https://source.unsplash.com/collection/4945345"
		],
		features: [
			"Feature 1",
			"Feature 2",
			"Feature 3",
			"Feature 4",
			"Feature 5",
			"Feature 6",
			"Feature 7",
			"Feature 8"
		],
		price: "2000"
	},
	{
		name: "Listing Three", 
		image: "https://source.unsplash.com/dqZGqFU4Usk", 
		description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird.",
		author: {
			id: "5cf7d811373ad70d4d1925ce",
			username: "Agent 1"
		},
		gallery: [
			"https://source.unsplash.com/collection/4945345",
			"https://source.unsplash.com/collection/4945345"
		],
		features: [
			"Feature 1",
			"Feature 2",
			"Feature 3",
			"Feature 4",
			"Feature 5",
			"Feature 6",
			"Feature 7",
			"Feature 8"
		],
		price: "2000"
	},
	{
		name: "Listing Four", 
		image: "https://source.unsplash.com/07t5vZoW9n8", 
		description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird.",
		author: {
			id: "5cf7d811373ad70d4d1925ce",
			username: "Agent 1"
		},
		gallery: [
			"https://source.unsplash.com/collection/4945345",
			"https://source.unsplash.com/collection/4945345",
			"https://source.unsplash.com/collection/4945345",
			"https://source.unsplash.com/collection/4945345"
		],
		features: [
			"Feature 1",
			"Feature 2",
			"Feature 3",
			"Feature 4",
		],
		price: "2000"
	}
	];

function seedDB(){
	Listing.deleteMany({}, function(err){
		if (err) {
			console.log(err)
		} 
		else {
			Comment.deleteMany({}, (err) => {if (err) {console.log(err)}});
		}
		list.forEach(function(seed){
			Listing.create(seed,function(err,listing){
				if (err) {
					console.log(err)
				} else {
					// console.log("Added Listing");
					Comment.create(
						{
							text: "Climb a tree, wait for a fireman jump to fireman then scratch his face but meow to be let in", 
							author: {
								id: "5cf50613ea840b0378d3670f",
								username: "user"
							}
						}, function(err,comment){
							if (err) {
								console.log(err)
							} else {
								listing.comments.push(comment);
								listing.save();
								// console.log("Added Comment")
							}
						});
					}
			});
		});
		console.log("seeds created");
	});
}

module.exports = seedDB;