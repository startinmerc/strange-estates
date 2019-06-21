var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
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
		// required: "Please provide a 1-5 rating",
		min: 1,
		max: 5,
		// validate: {
			// validator: Number.isInteger,
			// message: "Rating must be a whole number"
		// }
	},
	listing: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Listing"
	}
},{
	timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);