import $ from "jquery"

const videoAPI = {
	getAll: function(set,others){
		$.ajax({
	      type: "GET",
	      url: `http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/videos`,
	      success: function(response) {
	         if(response.status == 200){
	          set(response.data)
	          if(others){
	          	others.forEach(item => item())
	          }
	         }else{
	          alert(response.message)
	         }
	      },
	      error: function(error) {
	        alert(error.message)
	      }
	    })
	},
	create: function(url,setNewData,others){
		console.log(others)
		const getAll = this.getAll
		if(url.length != 11){
			alert("id tidak valid")
			return
		}
		$.ajax({
	      type: "POST",
	      url: `http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/createVideo`,
	      data: { url },
	      success: function(response) {
	         if(response.status == 201){
	         	alert("sukses menambahkan " + url)
	         	getAll(setNewData,others)
	         }else{
	          if(response.message.errno === 19){
	          	alert("id sudah tersedia di database")
	          }else{
	          	alert(response.message)
	          }
	         }
	      },
	      error: function(error) {
	        alert(error.message)
	      }
	    })
	},
	delete: function(target,setNewData){
		const getAll = this.getAll
		$.ajax({
	      type: "DELETE",
	      url: `http://localhost:3001/admin/savxr6wecvrt46rt376rtb3y/deleteVideo?target=${target}`,
	      success: function(response) {
	         if(response.status == 201){
	         	alert("sukses menghapus " + target)
	         	getAll(setNewData)
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

export default videoAPI