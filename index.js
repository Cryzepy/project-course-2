// import module nodejs
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")
const app = express()

// import module file
const tokensController = require("./controllers/tokensController.js")
const usersController = require("./controllers/usersController.js")
const videosController = require("./controllers/videoController.js")
const fileUploadController = require("./controllers/fileUploadController.js")


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
app.delete("/admin/:keyaccess/deleteUser/",usersController.deleteUser)
app.post("/admin/:keyaccess/authLogin/",usersController.authLogin)
// tambah update ----------

app.get("/admin/:keyaccess/videos/",videosController.getAllVideos) 
app.post("/admin/:keyaccess/createVideo/",videosController.createVideo)
app.delete("/admin/:keyaccess/deleteVideo/",videosController.deleteVideo)

////////////////////////////////////////////////////////////////////////
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './db/uploads');
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
})
const upload = multer({ storage });
app.put("/uploads/tugas", upload.single('file') ,fileUploadController)
////////////////////////////////////////////////////////////////////////


app.listen(3001, () => {
	console.log(`server running`)
})