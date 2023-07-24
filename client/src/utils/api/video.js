import $ from "jquery"

import vbl from "../variabel.js"

const videoAPI = {
	getAll: function(set,others){
		
		$.ajax({
	      type: "GET",
	      url: `${vbl.serverURL}/videos`,
	      success: function(response) {
	          set(response.data)
	          if(others){
	          	others.forEach(item => item())
	          }
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
	create: function(payload,setNewData,others){
		const getAll = this.getAll
		if(payload.url.length != 11){
			alert("id tidak valid")
			return
		}

		$.ajax({
	      type: "POST",
	      url: `${vbl.serverURL}/createVideo`,
	      data: payload,
	      success: function(response) {
	     	alert("sukses menambahkan " + payload.url)
	     	getAll(setNewData,others)
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
	delete: function(target,setNewData){
		const getAll = this.getAll
		$.ajax({
	      type: "DELETE",
	      data: { target },
	      url: `${vbl.serverURL}/deleteVideo`,
	      success: function(response) {
	     	alert("sukses menghapus " + target)
	     	getAll(setNewData)
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

export default videoAPI