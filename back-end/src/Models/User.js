const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
    immutable: true,
    default: () => Date.now()
	},
});

module.exports = mongoose.model("User", schema);