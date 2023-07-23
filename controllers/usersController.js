const usersModel = require("../models/usersModel.js")
const tokensModel = require("../models/tokensModel.js")

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

const usersController = {
	getAllUsers: (req, res) => {
		if(!getAccess(req.params.keyaccess,res)) return
		usersModel.getAllUsers((err, rows) => {
			if(err){
				res.json({
					status: 500,
					message: err
				})
			}else{
				res.json({
					status: 201,
					data: rows
				})
			}
		})
	},
	getUserByName: (req, res) => {
		if(!getAccess(req.params.keyaccess,res)) return
		const username = req.query.username
		usersModel.getUserByName(username,(err, rows) => {
			if(err){
				res.json({
					status: 500,
					message: err
				})
			}else{
				if(rows.length){
					res.json({
						status: 201,
						data: rows
					})
				}else{
					res.json({
						status: 500,
						message: "username tidak terdaftar"
					})	
				}
			}
		})
	},
	createUser: (req, res) => {
		if(!getAccess(req.params.keyaccess,res)) return

		const payload = {
			username: req.body.username,
			password: req.body.password
		}

		usersModel.createUser(payload,(err) => {
			if(err){
				res.json({
					status: 500,
					message: err
				})
			}else{
				res.json({
					status: 201,
					message: payload.username + " sukses dibuat"
				})
			}
		})

	},
	updateUser: (req, res) => {
		if(!getAccess(req.params.keyaccess,res)) return

		const payload = req.body

		usersModel.getAllUsers((err,data) => {

			let roleTarget;
			const lengthAdmin = data.filter(row => {
				if(row.username === payload.username){
					roleTarget = row.role
				}
				return row.role === "admin"
			})

			if(lengthAdmin.length <= 1 && roleTarget == "admin"){
				res.json({
					status: 500,
					message: "tidak bisa menghapus admin terakhir"
				})
				return
			}
			
			usersModel.updateUser(payload,(err) => {
				if(err){
					res.json({
						status: 500,
						message: err
					})
				}else{
					res.json({
						status: 201,
						message: payload.username + " sukses sunting"
					})
				}
			})
		})


	},
	deleteUser: (req, res) => {
		if(!getAccess(req.params.keyaccess,res)) return
		const username = req.body.username

		usersModel.getAllUsers((err,data) => {

			let roleTarget;
			const lengthAdmin = data.filter(row => {
				console.log(row.username,username)
				if(row.username === username){
					roleTarget = row.role
				}
				return row.role === "admin"
			})

			if(lengthAdmin.length <= 1 && roleTarget == "admin"){
				res.json({
					status: 500,
					message: "tidak bisa menghapus admin terakhir"
				})
				return
			}

			usersModel.deleteUser(username,(err) => {
				if(err){
					res.json({
						status: 500,
						message: err
					})
				}else{
					res.json({
						status: 201,
						message: `${username} sukses dihapus`
					})
				}
			})
		})


	},
	authLogin: (req, res) => {
		if(!getAccess(req.params.keyaccess,res)) return

		const payload = req.body

		usersModel.authLogin(payload,(err, rows) => {
			if(err){
				res.json({
					status: 500,
					message: err
				})
			}else{
				if(rows.length){
					const myToken = {
						token: Date.now(),
						username: payload.username,
						expired: Date.now() + (7 * 86400000)
					}

					tokensModel.createToken(myToken,function(){})

					const configCookie = {
						token: myToken.token,
						maxAge: (7 * 86400000),
						role: rows.role
					}

					res
					.json({
						status: 201,
						message: "login success",
						configCookie
					})
				}else{
					res.json({
						status: 500,
						message: "username atau password salah"
					})	
				}
			}
		})
	}

}

module.exports = usersController