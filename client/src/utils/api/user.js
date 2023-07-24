import $ from "jquery"

import vbl from "../variabel.js"

const userAPI = {
	getAll: payload => {
		$.ajax({
	      type: "GET",
	      url: `${vbl.serverURL}/users/`,
	      success: function(response) {
          payload.setUsers(response.data)
	      },
	      error: function(error) {
          alert(error.responseJSON.message || "network error")
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
          url: `${vbl.serverURL}/createUser/`,
          data: { username: input.username, password: input.password },
          success: function(response) {
            alert(response.message)
            getAll({setUsers: payload.setUsers})
            success()
          },
          error: function(error) {
            alert(error.responseJSON.message || "failed create account")
          }
        })
	},
	delete: function (username,payload) {

		const getAll = this.getAll
		
		$.ajax({
          type: "DELETE",
          url: `${vbl.serverURL}/deleteUser/`,
          data: { username },
          success: function(response) {
            alert(response.message)
            getAll({setUsers: payload.setUsers})
          },
          error: function(error) {
            if(error.responseJSON){
              if(error.responseJSON.message){
                alert(error.responseJSON.message)
                return
              }
            }
            alert("network error")
          }
        })
	},
	auth: function (payload,config) {
     $.ajax({
        url: `${vbl.serverURL}/authLogin`,
        type: 'POST',
        data: {
          ...payload,
        },
        success: function(response) {
          document.cookie = `token=${response.createToken.name};http-only=true;secure=true;max-age=${response.createToken.maxAge}`
          config.navigate(response.role === "admin" ? "/admin" : "course")
        },
        error: function(error) {
          if(error.responseJSON){
            if(error.responseJSON.message){
              alert(error.responseJSON.message)
              return
            }
          }
          alert("network error")
        }
      })
  },
  updateUser: function(payload) {
    $.ajax({
      url: `${vbl.serverURL}/updateUser`,
      type: 'POST',
      data: payload,
      success: function(response) {
        alert("sukses menyunting " + payload.username)
      },
      error: function(error) {
        if(error.responseJSON){
          if(error.responseJSON.message){
            alert(error.responseJSON.message)
            return
          }
        }
        alert("network error")
      }
    })
  }

}

export default userAPI