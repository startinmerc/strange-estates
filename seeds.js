var mongoose 	= require("mongoose"),
	Listing 	= require("./models/listing"),
	Comment 	= require("./models/comment"),
	middleware = require("./middleware");

var list = [
	{
		name: "Listing One",
		image: {src: "https://images.unsplash.com/photo-1422225976800-f5db04c7e83e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9", alt:"Listing Image"},
		description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird.",
		author: {
			id: "5cf7d811373ad70d4d1925ce",
			username: "Agent 1"
		},
		gallery: [
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"},
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"},
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"}
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
		image: {src: "https://images.unsplash.com/photo-1453286465977-2de00962433b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9", alt:"Listing Image"},
		description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird.",
		author: {
			id: "5cf7d811373ad70d4d1925ce",
			username: "Agent 1"
		},
		gallery: [
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"},
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"},
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"}
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
		image: {src: "https://images.unsplash.com/photo-1518704267117-e9278b163f14?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9", alt:"Listing Image"},
		description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird.",
		author: {
			id: "5cf7d811373ad70d4d1925ce",
			username: "Agent 1"
		},
		gallery: [
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"},
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"}
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
		image: {src: "https://images.unsplash.com/photo-1529994662837-8afc6fc57f2c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9", alt:"Listing Image"},
		description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird.",
		author: {
			id: "5cf7d811373ad70d4d1925ce",
			username: "Agent 1"
		},
		gallery: [
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"},
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"},
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"},
			{src: "https://source.unsplash.com/collection/4945345", alt: "Gallery Image"}
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
							},
							rating: 4
						}, function(err,comment){
							if (err) {
								console.log(err)
							} else {
								listing.comments.push(comment);
								listing.rating = middleware.calculateAverage(listing.comments);
								listing.save();
							}
						});
					}
			});
		});
		console.log("seeds created");
	});
}

module.exports = seedDB;