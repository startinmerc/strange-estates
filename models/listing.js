var mongoose = require("mongoose");


var listingSchema = new mongoose.Schema({
	name: String,
	image: {
		src: String,
		alt: String
	},
	description: String,
	price: String,
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review"
		}
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	gallery: [],
	features: [],
	rating: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Listing", listingSchema);