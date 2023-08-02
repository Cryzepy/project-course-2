import axios from "axios"

class GoogleInfo {
	constructor () {
		this.API_KEY2 = "AIzaSyBpvpH8TZJ23b4_vwk4OxtS7SLVh4lApqE"
	}

	setElement (url,setData,index) {
		axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${url}&key=${this.API_KEY2}`)
			.then(response => {
				const payload = {
					title : response.data.items[0].snippet.title,
					channelTitle: response.data.items[0].snippet.channelTitle,
					description: response.data.items[0].snippet.description
				}

				setData(prev => {
					const temp = [...prev]
					temp[index] = payload
					return temp
				})
			})
			.catch(err => {
				const payload = {
					title : "Judul Tidak Tesedia",
					channelTitle: "Channel Name",
					description: "Deskripsi tidak tersedia"
				}

				setData(prev => {
					const temp = [...prev]
					temp[index] = payload
					return temp
				})
			})
	}
}

const google = new GoogleInfo()

export default google