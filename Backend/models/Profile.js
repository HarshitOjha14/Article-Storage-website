const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
	facebookUrl: {
		type: String,
	},
	instagramUrl: {
		type: String,
	},
	twitterUrl: {
		type: String,
	},
	linkedinUrl: {
		type: String,
	},
	
});


module.exports = mongoose.model("Profile", profileSchema);