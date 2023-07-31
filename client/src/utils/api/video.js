import $ from "jquery"

import vbl from "../variabel.js"

const parseUrl = (url,pointer) => {
	const firstIndex = url.indexOf(pointer) + pointer.length
	return url.slice(firstIndex,firstIndex + 11)
}

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

		// title, description, channelTitle

		const getAll = this.getAll
		let url = payload.url
		const pointer = ".youtube.com/watch?v="

		let loop = 0
		while(url.length != 11){
			if (url.includes(pointer) && loop === 0) {
				url = parseUrl(url,pointer)
				loop += 1
			}else{
				alert("url tidak valid")
				return
			}
		}

		$.ajax({
	      type: "POST",
	      url: `${vbl.serverURL}/createVideo`,
	      data: { ...payload, url },
	      success: function(response) {
	     	alert("sukses menambahkan " + url)
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
	},
	deleteAll: function(setNewData) {
		const getAll = this.getAll
		$.ajax({
	      type: "DELETE",
	      url: `${vbl.serverURL}/deleteVideoAll`,
	      success: function(response) {
	     	alert("sukses menghapus semua videos")
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