var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
	text: {
		type: String
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: {
			type: String
		}
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
	},
	listing: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Listing"
	}
},{
	timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);