import $ from "jquery"

import vbl from "../variabel.js"

const tokenAPI = {

	getToken: (token,payload) => {
		$.ajax({
	      type: "POST",
	      url: `${vbl.serverURL}/token`,
	      data: { token },
	      success: function(response) {
			if(response.data.role == "admin"){
				if(payload.setUsername){
					payload.setUsername(response.data.username)
				}
				payload.navigate("/admin")
			}else if(response.data.role == "user"){
				if(payload.setUsername){
					payload.setUsername(response.data.username)
				}
				payload.navigate('/course')
			}
	      },
	      error: function(error) {
	      	payload.navigate("/")
	      }
	    })
	},

	deleteToken: (token,payload) => {
		
		$.ajax({ 
			type: "POST",
			url: `${vbl.serverURL}/updateUser`
        })

        document.cookie = "token=;max-age=0"
		payload.navigate("/")
	}
}

export default tokenAPI