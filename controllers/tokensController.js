const tokensModel = require("../models/tokensModel.js")
const usersModel = require("../models/usersModel.js")

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

const tokensController = {
	getTokenByName: (req, res) => {
		if(!getAccess(req.params.keyaccess,res)) return
		const token = req.query.search
		tokensModel.getTokenByName(token,(err, rows) => {
			if(err){
				res.json({
					status: 500,
					message: err
				})
			}else{
				if(rows.length){
					res.json({
						status: 200,
						data: rows
					})
				}else{
					res.json({
						status: 500,
						message: "maaf anda tidak memiliki akses"
					})	
				}
			}
		})
	},
	deleteToken: (req, res) => {
		if(!getAccess(req.params.keyaccess,res)) return

		const token = req.query.target

		tokensModel.deleteToken(token,(err) => {
			if(err){
				res.json({
					status: 500,
					message: err
				})
			}else{
				res.json({
					status: 201,
					message: token + " sukses dihapus"
				})
			}
		})
	}
}


module.exports = tokensController