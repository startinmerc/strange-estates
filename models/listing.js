mongoose = require("mongoose");

var listingSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

module.exports = mongoose.model("Listing", listingSchema);