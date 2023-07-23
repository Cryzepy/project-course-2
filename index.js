// import module nodejs
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()

// import module file
const tokensController = require("./controllers/tokensController.js")
const usersController = require("./controllers/usersController.js")
const videosController = require("./controllers/videoController.js")


//middleware
app.use(cookieParser())
app.use(express.urlencoded( { extended: true} ))
app.use(express.json())
app.use(cors())

app.get("/admin/:keyaccess/token/",tokensController.getTokenByName)
app.delete("/admin/:keyaccess/deleteToken/",tokensController.deleteToken)

app.get("/admin/:keyaccess/users/",usersController.getAllUsers) 
app.get("/admin/:keyaccess/user/",usersController.getUserByName)
app.post("/admin/:keyaccess/createUser/",usersController.createUser)
app.post("/admin/:keyaccess/updateUser/",usersController.updateUser)
app.delete("/admin/:keyaccess/deleteUser/",usersController.deleteUser)
app.post("/admin/:keyaccess/authLogin/",usersController.authLogin)

app.get("/admin/:keyaccess/videos/",videosController.getAllVideos) 
app.post("/admin/:keyaccess/createVideo/",videosController.createVideo)
app.delete("/admin/:keyaccess/deleteVideo/",videosController.deleteVideo)

app.listen(3001, () => {
	console.log(`server running`)
})