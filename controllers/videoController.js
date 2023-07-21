const videosModel = require("../models/videosModel.js")

const getAccess = (keyaccess,res) => {
	const adminpw = "savxr6wecvrt46rt376rtb3y"
	if(keyaccess != adminpw){
		res.json({
			status: 500,
			message: "maaf anda tidak memiliki access"
		})
		return false
	}
	return true
}

const videosController = {
	getAllVideos:  (req, res) =>  {

		if(!getAccess(req.params.keyaccess,res)) return

		videosModel.getAllVideos((err, rows) => {
			if(err){
				res.json({
					status: 500,
					message: err
				})
			}else{
				res.json({
					status: 200,
					data: rows
				})
			}
		})
	},
	createVideo: (req, res) => {
		if(!getAccess(req.params.keyaccess,res)) return
		
		if(!req.body.url){
			res.json({
				status: 500,
				message: "payload tidak dikirim"
			})
			return
		}

		videosModel.createVideo(req.body.url,(err) => {
			if(err){
				res.json({
					status: 500,
					message: err
				})
			}else{
				res.json({
					status: 201,
					message: "video sukses ditambahkan"
				})
			}
		})
	},
	deleteVideo: (req, res) => {
		if(!getAccess(req.params.keyaccess,res)) return

		const video = req.query.target

		videosModel.deleteVideo(video,(err) => {
			if(err){
				res.json({
					status: 500,
					message: err
				})
			}else{
				res.json({
					status: 201,
					message: "sukses menghapus video"
				})
			}
		})
	}
}


module.exports = videosController