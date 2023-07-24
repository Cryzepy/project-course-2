const mongoose = require("mongoose")

const usersModel = require("../models/usersModel.js")

const getAccess = require("../utils/access.js")

// connection to database
mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


const usersController = {
	getAllUsers: async (req, res) => {
		const { key } = req.body

		const access = getAccess(key,res)
		if(!access) return

		try {
			const users = await usersModel.find({},{ token: 0, _id: 0 })
			res.status(200).send({ data: users })
		} catch (err) {
			res.status(404).send({ message: err._message || "connection error" })
		}
	},
	createUser: async (req, res) => {

		const access = getAccess(req.body.key,res)
		if(!access) return

		const payload = {
			username: req.body.username,
			password: req.body.password,
			role: "user",
			token: {
				name: null,
				expired: null
			},
		}

		let message

		try {
			const create = await usersModel.create(payload)
			res.status(200).send({ message: "sukses membuat akun" })
		} catch (err) {
			console.log(err)
			if (err.code === 11000) {
				message = "username tidak disarankan"
			} else {
				message = err._message || "gagal menghubungkan ke database"
			}
			res.status(400).send({ message })
		}

	},
	updateUser: async (req, res) => {

		const { key, username, set } = req.body

		const access = getAccess(key,res)
		if(!access) return

		try {
			const users = await usersModel.find({},{ token: 0, _id: 0, password: 0 })

			let roleTarget

			const admin = users.filter(user => {
				if (user.username === username) {
					roleTarget = user.role
				}
				return user.role === "admin"
			})

			if (!roleTarget) {
				res.status(401).send({ message: "terjadi kesalahan pada payload" })
				return
			}
			else if (admin.length < 2 && roleTarget != "admin" && req.body.set.role) {
				res.status(401).send({ message: "tidak bisa menghapus admin utama" })
				return
			}

		} catch (err) {
			res.status(404).send({ message: err._message || "connection error" })
			return
		}

		const setter = set.role ? "role" : "token"

		const payload = {}

		if (setter === "role") {
			payload.role = "role"
		} if(setter === "token" && token) {
			payload.token.name = token
		} else {
			res.status(401).send({ message: "payload tidak terkirim" })
			return
		}

		try {
			const upUser = await usersModel.updateOne({ username }, { $set: payload })
			res.status(200).send({ message: "sukses mengupdate data" })
		} catch (err) {
			res.status(401).send({ message: err._message || "gagal mengupdate data" })
		}

	},
	deleteUser: async (req, res) => {

		const access = getAccess(req.body.key,res)
		if(!access) return

		const username = req.body.username

		try {
			const users = await usersModel.find({},{ token: 0, _id: 0, password: 0 })

			let roleTarget

			const admin = users.filter(user => {
				if (user.username === username) {
					roleTarget = user.role
				}
				return user.role === "admin"
			})

			if (!roleTarget) {
				res.status(401).send({ message: "terjadi kesalahan pada payload" })
				return
			}

			else if (admin.length < 2 && roleTarget != "admin") {
				res.status(401).send({ message: "tidak bisa menghapus admin utama" })
				return
			}

		} catch (err) {
			console.log(err)
			res.status(404).send({ message: err._message || "connection error" })
			return
		}

		try {
			const del = await usersModel.deleteOne({ username })

			if (del.deletedCount) {
				res.status(200).send({ message: "sukses menghapus akun" })
				return
			} 

			res.status(404).send({ message: "terjadi kesalahan pada payload" })

		} catch (err) {
			res.status(300).send({ message: err._message || "newtwok error" })
		}
	},
	authLogin: async (req, res) => {
		
		const { username, password, key } = req.body

		const access = getAccess(key,res)
		if(!access) return

		try {
			const find = await usersModel.findOne({ username, password })
			
			if (!find) {
				res.status(404).send({ message: "username atau password salah" })
				return
			} 

			try {

				const createToken = {
					name: Date.now(),
					expired: Date.now() + (7 * 86400000),
					maxAge: (7 * 86400000),

				}

				const upUser = await usersModel.updateOne({ username }, { $set: {
					token: {
						name: createToken.name,
						expired: createToken.expired
					}
				} })

				res
				.status(200)
				.cookie("token",createToken.name+"pantek", {
					maxAge: createToken.maxAge
				}).
				send({ message: "login sukses", role: find.role })
			} catch (err) {
				res.status(401).send({ message: err._message || "gagal login" })
				return
			}

		} catch (err) {
			res.status(400).send({ message: "network error" })
		}
	}
}

module.exports = usersController