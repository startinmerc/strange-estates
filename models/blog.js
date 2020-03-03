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
		type: String,
		required: true,
		default: "Title"
	},
	text: {
		type: String,
		required: true,
		default: "Text Content"
	},
	image: {
		src: {
			type: String,
			default: "https://images.unsplash.com/photo-1488650989610-0d7e27dc293c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=790&h=527&fit=crop&ixid=eyJhcHBfaWQiOjF9"
		},
		alt: {
			type: String,
			default: "Blog Image"
		},
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Blog", blogSchema);