const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true
	},
	token: {
		name: String,
		expired: Number
	}
})

module.exports = mongoose.model("accounts",userSchema)