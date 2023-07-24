const getAccess = (key,response) => {
	if(key !== process.env.authkey){
		response.json({
			status: 500,
			message: "Maaf, anda tidak memiliki akses ke sistem"
		})
		return false
	}
	return true
}

module.exports = getAccess