var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: {
			type: String
		}
	},
	title: {
		type: String
	},
	text: {
		type: String
	},
	image: {
		src: String,
		alt: String
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Blog", blogSchema);