var mongoose 	= require("mongoose"),
	Listing 	= require("./models/listing"),
	Comment 	= require("./models/comment");

var list = [
	{name: "Listing One", image: "https://source.unsplash.com/VhpDAKvVA-Q", description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird."},
	{name: "Listing Two", image: "https://source.unsplash.com/uh0u8OH4zuE", description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird."},
	{name: "Listing Three", image: "https://source.unsplash.com/dqZGqFU4Usk", description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird."},
	{name: "Listing Four", image: "https://source.unsplash.com/07t5vZoW9n8", description: "Unwrap toilet paper. Freak human out make funny noise mow mow mow mow mow mow success now attack human stinky cat. Catty ipsum lounge in doorway. Destroy couch cough hairball, eat toilet paper but sleep everywhere, but not in my bed and fat baby cat best buddy little guy pelt around the house and up and down stairs chasing phantoms. Scratch me there, elevator butt howl uncontrollably for no reason meow meow, i tell my human and cats are fats i like to pets them they like to meow back yet meow all night having their mate disturbing sleeping humans so wake up human for food at 4am bring your owner a dead bird."}
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
					console.log("Added Listing");
					Comment.create(
						{
							text: "Climb a tree, wait for a fireman jump to fireman then scratch his face but meow to be let in", 
							author:"Comment Author"
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