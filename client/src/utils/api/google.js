import axios from "axios"

class GoogleInfo {
	constructor () {
		this.API_KEY2 = "AIzaSyBpvpH8TZJ23b4_vwk4OxtS7SLVh4lApqE"
	}

	setElement (url,title,channelTitle,description) {
		axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${url}&key=${this.API_KEY2}`)
			.then(response => {
				title.innerText = response.data.items[0].snippet.title
				channelTitle.innerText = response.data.items[0].snippet.channelTitle
				description.innerText = response.data.items[0].snippet.description
			})
			.catch(err => {
				console.log(err)
			})
	}
}

const google = new GoogleInfo()

export default google