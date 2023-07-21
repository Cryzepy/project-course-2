import $ from "jquery"

const tokenAPI = {

	getToken: (token,payload) => {
		$.ajax({
	      type: "GET",
	      url: `http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/token?search=${token}`,
	      success: function(response) {
		      	if(response.status == 200){
	         $.ajax({
	          type: "GET",
	          url: `http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/user?username=${response.data[0].username}`,
	          success: function(response) {
	             if(response.status == 201){
	              if(response.data[0].role == "admin"){
	              	if(payload.setUsername){
	                	payload.setUsername(response.data[0].username)
	              	}
	                payload.navigate("/admin")
	              }else if(response.data[0].role == "user"){
	              	if(payload.setUsername){
	                	payload.setUsername(response.data[0].username)
	              	}
	                payload.navigate('/course')
	               }
	             }else{
	              payload.navigate("/")
	             }
	          },
	          error: function(error) {
	             payload.navigate("/")
	          }
	        })
	       }else{
	        payload.navigate("/")
	       } 
	      },
	      error: function(error) {
	      	alert(error.message)
	      	payload.navigate("/")
	      }
	    })
	},

	deleteToken: (token,payload) => {
		
		$.ajax({ 
			type: "DELETE",
			url: `http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/deleteToken?target=${token}`
        })

        document.cookie = "token=;max-age=0"
		payload.navigate("/")
	}
}

export default tokenAPI