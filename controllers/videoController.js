const mongoose = require("mongoose")

const videosModel = require("../models/videosModel.js")

const getAccess = require("../utils/access.js")

// connection to database
mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const videosController = {
	getAllVideos: async (req, res) =>  {

		const access = getAccess(req.params.keyaccess,res)
		if(!access) return

		try {
			const videos = await videosModel.find()
			res.status(200).send({ data: videos })
		} catch (err) {
			res.status(500).send({ message: err._message || "network error" })
		}
	},
	createVideo: async (req, res) => {

		const { url, googleForm, tags } = req.body
		
		const access = getAccess(req.params.keyaccess,res)
		if(!access) return

		if (url) {
			if(url.length != 11){
				res.status(400).send({ message: "id tidak valid" })	
				return
			}
		}

		try {

			const newTags = tags.split(";").filter(el => el).map(el => el.trim())

			if(newTags.length > 6) {
				res.status(301).send({ message: "tag maximal 6" })
				return
			}

			const payload = { url, linkTugas: googleForm, tags: newTags }
	
			const create = await videosModel.create(payload)
			res.status(200).send({ message: "sukses menambahkan video" })
		} catch (err) {
			if(err.code == 11000){
				res.status(400).send({ message: "video sudah ada" })
				return
			}
			res.status(400).send({ message: err._message || "connection error" })
		}
	},
	deleteVideo: async (req, res) => {
		
		const { target } = req.body

		const access = getAccess(req.params.keyaccess,res)
		if(!access) return

		try {
			const del = await videosModel.deleteOne({ url: target })
			if(del.deletedCount === 0){
				res.status(500).send({ message: "payload error" })
				return
			}
			res.status(200).send({ message: "sukses menghapus video" })
		} catch (err) {
			res.status(500).send({ message: err._message || "connection error" })
		}
	}
}


module.exports = videosController