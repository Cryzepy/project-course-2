const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	linkTugas: String,
	tags: Array
})

module.exports = mongoose.model("videos",videoSchema)