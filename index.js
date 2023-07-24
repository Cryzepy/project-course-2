	// import module nodejs
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()

require("dotenv").config()

// import module file
const usersController = require("./controllers/usersController.js")
const videosController = require("./controllers/videoController.js")

//middleware
app.use(cookieParser())
app.use(express.urlencoded( { extended: true} ))
app.use(express.json())
app.use(cors())

app.get("/admin/:keyaccess/users/",usersController.getAllUsers) // success
app.post("/admin/:keyaccess/token/",usersController.getToken) 
app.post("/admin/:keyaccess/createUser/",usersController.createUser)  // success
app.post("/admin/:keyaccess/updateUser/",usersController.updateUser) // success
app.delete("/admin/:keyaccess/deleteUser/",usersController.deleteUser) // success
app.post("/admin/:keyaccess/authLogin/",usersController.authLogin)

app.get("/admin/:keyaccess/videos/",videosController.getAllVideos) // success
app.post("/admin/:keyaccess/createVideo/",videosController.createVideo) // success
app.delete("/admin/:keyaccess/deleteVideo/",videosController.deleteVideo) // success

app.listen(3001, () => {
	console.log(`server running`)
})