import videoUtil from "../utils/api/video.js"
import $ from "jquery"
import { useEffect } from "react"

const VideoList = ({videos,setVideos}) => {

  useEffect(() => {
    const y = parseFloat($(".pointer").css("height").replace("px",""))
    $(".pointer").css("top",`-${y+3}px`)
  },[])

  const handleDeleteAllVideos = () => {
    let key = (Date.now() * Math.random()).toString().replace(".","")

    while(key.length < 10){
      key += "Q"
    }

    const question = prompt(`apakah anda yakin ingin menghapus semua video dari database ? jika tulis "${key}" dengan benar `)

    if(question === key){
      videoUtil.deleteAll(setVideos)
    }else{
      alert("masukkan keyword dengan benar")
    }

  }

	return (<>
            <hr className="hr1" />
                 <div className="input">
                    <input type="text" id="txt-url" placeholder="id youtube" />
                    <input type="text" id="txt-link-google-form" placeholder="link tugas" />
                    <div className="inp-tags">
                      <input type="text" id="txt-tags" placeholder="tags" />
                      <small className="bg-dark text-light py-2 px-3 rounded pointer">pisahkan beberapa tags dengan (;), ex: javacript; belajar AI</small>
                    </div>
                    <button className="btn btn-primary" id="btn-add-user" onClick={function(){
                      videoUtil.create({
                        url: $("#txt-url").val(),
                        googleForm: $("#txt-link-google-form").val(),
                        tags: $("#txt-tags").val()
                      },setVideos,[() => {
                        $("#txt-url").val("")
                        $("#txt-link-google-form").val("")
                        $("#txt-tags").val("")
                      }])
                    }}>add video id</button>
                 </div>
      
                 <div className="list-users-container">
                   { !videos.length && <span className="table">tidak ada data</span> }
                   { videos.length >= 1 && (<>
                     <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">ID Video</th>
                          <th scope="col" className="d-none d-md-table-cell">link tugas</th>
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
                                {
                                  video.linkTugas ? 
                                    <td className="d-none d-md-table-cell"><a href={video.linkTugas} target='_blank'>{video.linkTugas}</a></td> :
                                    <td className="d-none d-md-table-cell">tidak ada tugas</td>
                                }
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
                { videos.length && <button className="btn btn-danger text-end" id="delete-all-videos" onClick={handleDeleteAllVideos}>Hapus Semua Video</button> }
               </>)
             }
             </div>
             </>)
}

export default VideoList