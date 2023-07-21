import $ from "jquery"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../css/course.css"
import logo from "../images/Logo PKM PM 1.jpg"

import Footer from "../components/footer.jsx"
import BtnLogout from "../components/btnlogout.jsx"
import ErrorPage from "../pages/404.jsx"

import tokenUtil from "../utils/api/token.js"
import videoUtil from "../utils/api/video.js"

const CoursePage = () => {

   const navigate = useNavigate()

    function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

   const [username, setUsername] = useState("")
   const [data, setData] = useState(false)


   
   useEffect(() => {

    const token = getCookie("token")

    tokenUtil.getToken(token,{ navigate, setUsername })
    videoUtil.getAll(setData,[runjQuery])

     function runjQuery(){
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

         $("#btn-send-tugas").click(function(){
            const file = $(this).prevAll(".inp-tugas")
            const data = file[0].files[0]
            const formData = new FormData()
            formData.append("file",data)

            $.ajax({
               type: "PUT",
               url: "/uploads/tugas",
               data: formData,
               processData: false,
               contentType: false,
               success: function(response) {
                   alert('File uploaded successfully!');
               },
               error: function(error) {
                   alert('Error uploading file.');
               }
            })
         })
     }

      
   },[])

	return (
      <>
      {
         data == false ? <ErrorPage /> :
         (
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
                        return (
                           <div className="course" key={index}>
                              <a href={linkVideo} target="_blank">
                                 <img src={linkThumb} alt="thumbnail"/>
                              </a>
                              <div className="input-file">
                                 <input type="file" className="inp-tugas" id="inp-tugas-<%=index%>" />
                                 <button className="btn btn-danger btn-close-addfile">tutup</button>
                                 <button className="btn btn-success" id="btn-send-tugas">kirim</button>
                              </div>
                              <button className="btn btn-primary btn-submit w-100">Submit Tugas</button>
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
      </>
	)
}

export default CoursePage