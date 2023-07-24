import videoUtil from "../utils/api/video.js"
import $ from "jquery"

const VideoList = ({videos,setVideos}) => {
	return (<>
            <hr className="hr1" />
                 <div className="input">
                    <input type="text" id="txt-url" placeholder="id youtube" />
                    <input type="text" id="txt-link-google-form" placeholder="link tugas" />
                    <button className="btn btn-primary" id="btn-add-user" onClick={function(){
                      videoUtil.create({
                        url: $("#txt-url").val(),
                        googleForm: $("#txt-link-google-form").val()
                      },setVideos,[() => {
                        $("#txt-url").val("")
                        $("#txt-link-google-form").val("")
                      }])
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
                          <th scope="col" className="d-none d-md-block">link tugas</th>
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
                                <td className="d-none d-md-block"><a href={video.linkTugas} target='_blank'>{video.linkTugas}</a></td>
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