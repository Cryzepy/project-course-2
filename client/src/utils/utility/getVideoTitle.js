import $ from "jquery"
import cheerio from "cheerio"

const API_KEY = "AIzaSyBpvpH8TZJ23b4_vwk4OxtS7SLVh4lApqE"

const getTitle = (id,element,set) => {

	if(element === undefined){
		return 
	}

  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`,
    type: 'GET',
    success: function(data) {
    	const videoTitle = data.items[0].snippet.title
    	element.innerText = videoTitle
      set(Date.now())
    }
  })
}

export default getTitle

