import videoUtil from "../utils/api/video.js"
import $ from "jquery"

const VideoList = ({videos,setVideos}) => {
	return (<>
            <hr className="hr1" />
                 <div className="input">
                    <input type="text" id="txt-url" />
                    <button className="btn btn-primary" id="btn-add-user" onClick={function(){
                      videoUtil.create($("#txt-url").val(),setVideos,[() => $("#txt-url").val("")])
                    }}>add video id</button>
                 </div>
      
                 <div className="list-users-container">
                   { !videos.length && <span className="table">tidak ada data</span> }
                   { videos.length >= 1 && (
                     <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">ID Video</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
      
                      {
                        videos.map((video,index) => {
                          return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{video.url}</td>
                                <td>
                                   <button className="btn btn-danger" onClick={function(){
                                    videoUtil.delete(video.url,setVideos)
                                   }}>delete</button>
                                </td>
                              </tr>
                          )
                        })
                      }
      
                    </tbody>
                </table>
               )
             }
             </div>
             </>)
}

export default VideoList