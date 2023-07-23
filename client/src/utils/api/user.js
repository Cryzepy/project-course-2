import $ from "jquery"

const userAPI = {
	getAll: payload => {
		$.ajax({
	      type: "GET",
	      url: "http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/users/",
	      success: function(response) {
	         if(response.status == 201){
	          payload.setUsers(response.data)
	         }else{
	          alert(response.message)
	         }
	      },
	      error: function(error) {
	         alert(error.message)
	      }
	    })
	},
	create: function (input,payload,success) {

		const getAll = this.getAll

        if(!input.username || !input.password){
        	alert("username atau password tidak valid")
        	return
        }

        if(input.username.length < 8 || input.password.length < 8){
          alert("username atau password minimal 8 character")
          return
        }
        if(input.username.includes(" ")){
          alert("username tidak boleh mengandung spasi")
          return
        }
        
        $.ajax({
          type: "POST",
          url: "http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/createUser/",
          data: { username: input.username, password: input.password },
          success: function(response) {
             if(response.status == 201){
              alert(response.message)
              getAll({setUsers: payload.setUsers})
              success()
             }else{
             	alert("gunakan username lain")
             }
          },
          error: function(error) {
             alert(error.message)
          }
        })
	},
	delete: function (username,payload) {

		const getAll = this.getAll
		
		$.ajax({
          type: "DELETE",
          url: "http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/deleteUser/",
          data: { username },
          success: function(response) {
             if(response.status == 201){
              alert(response.message)
              getAll({setUsers: payload.setUsers})
             }else{
             	alert(response.message)
             }
          },
          error: function(error) {
             alert(error.message)
          }
        })
	},
	auth: function (payload,config) {
     $.ajax({
        url: "http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/authLogin",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(response) {
          if(response.status == 201){
            document.cookie = `token=${response.configCookie.token};http-only=true;secure=true;max-age=${response.configCookie.maxAge}`
            config.navigate(response.configCookie.token === "admin" ? "/admin" : "course")
          }else{
            alert(response.message)
          }
        },
        error: function(error) {
          alert(error.message)
        }
      })
  },
  updateUser: function(payload) {
    $.ajax({
      url: "http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/updateUser",
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(payload),
      success: function(response) {
        if(response.status == 201){
          alert("sukses menyunting " + payload.username)
        }else{
          alert(response.message)
        }
      },
      error: function(error) {
        alert(error.message)
      }
      })
  }

}

export default userAPI