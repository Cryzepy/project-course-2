import $ from "jquery"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../css/course.css"
import logo from "../images/Logo PKM.png"

import Footer from "../components/footer.jsx"
import BtnLogout from "../components/btnlogout.jsx"
import ErrorPage from "../pages/404.jsx"

import tokenUtil from "../utils/api/token.js"
import videoUtil from "../utils/api/video.js"
import getTitle from "../utils/utility/getVideoTitle.js"

const CoursePage = () => {

   const navigate = useNavigate()

    function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

   const [username, setUsername] = useState("")
   const [data, setData] = useState(false)
   const [title,setTitle] = useState({
    id: null,
    element: null
   })


   
   useEffect(() => {

    const token = getCookie("token")

    tokenUtil.getToken(token,{ navigate, setUsername })
    videoUtil.getAll(setData,[runjQuery])
    console.log($(`#video-title-${index}`),"diluar func runjquery")
     function runjQuery(){
    console.log($(`#video-title-${index}`),"didalam func runjquery")
      $(".input-file").hide()

         $(".btn-submit").click(function(e){
            $(".btn-submit").show()
            $(".input-file").hide()
            $(e.target).prev().show()
            $(this).hide()
         })

         $(".btn-close-addfile").click(function(e){
            $(".btn-submit").show()
            $(".input-file").hide()
         })
 
     }

   },[])

   console.log("after use effect")

	return (
      <>
            <header>
               <span className="brand">
                  <img src={logo} alt="Logo PKM PM 1" />
                  <span className="txt-brand">PKM-PM | Universitas Muhammadiyah Malang</span>
               </span>
               <BtnLogout username={username} />
            </header>
      
            <div className="courses-container">
               <h2 className="course-title">Courses</h2>
               { !data.length && (<span>Tidak ada video</span>) }
               { data.length > 0 && (
                  <div className="courses">
                  {
                     data.map((id, index) => {
                        const linkVideo = `https://www.youtube.com/watch?v=${id.url}`
                        const linkThumb = `https://img.youtube.com/vi/${id.url}/maxresdefault.jpg`
                        const idVideo = `video-title-${index}`

                        const element = $(`#video-title-${index}`)[0]

                        getTitle(id.url,element)

                        return (
                           <div className="course" key={index}>
                              <a href={linkVideo} target="_blank">
                                 <img src={linkThumb} alt="thumbnail"/>
                              </a>
                              <h6 className="video-title" id={idVideo}>Judul Tidak Tersedia</h6>
                              <div className="input-file">
                              {
                                id.linkTugas && (
                                  <a href={id.linkTugas} className="button send-data" target="_blank">
                                    <button className="btn btn-success" id="btn-send-tugas">kirim</button>
                                  </a>
                                )
                              }

                              {
                                !id.linkTugas && ( <a className="btn btn-success button send-data" id="btn-send-tugas">Tidak Ada Tugas</a> )
                              }

                                 <button className="button btn btn-danger btn-close-addfile">tutup</button>
                              </div>
                              <button className="submit-tugas btn btn-primary btn-submit w-100">Submit Tugas</button>
                           </div>
                        )
                     })
                  }
                  </div>
                  )
               }
            </div>
            <Footer />
            </>
            )
}

export default CoursePage