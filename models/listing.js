var mongoose = require("mongoose");


var listingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	image: {
		src: {
			type: String,
			required: true
		},
		alt: {
			type: String,
			required: true,
			default: "Listing"
		},
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
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