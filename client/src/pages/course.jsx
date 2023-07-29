import $ from "jquery"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

import "../css/course.css"
import logo from "../images/Logo PKM.png"

import Footer from "../components/footer.jsx"
import BtnLogout from "../components/btnlogout.jsx"
import ErrorPage from "../pages/404.jsx"
import FilterCategory from "../components/filterCategory.jsx"

import tokenUtil from "../utils/api/token.js"
import videoUtil from "../utils/api/video.js"

const CoursePage = () => {

   const navigate = useNavigate()

    function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
   const [data, setData] = useState([])
   const [tags,setTags] = useState([])
   const [filter,setFilter] = useState(false)

   useEffect(() => {

      const token = getCookie("token")

      tokenUtil.getToken(token,{ navigate })

      videoUtil.getAll(setData)

   },[])

	return (
      <>  
            <BtnLogout size="small" />
            <header>
               <span className="brand">
                  <img src={logo} alt="Logo PKM PM 1" />
                  <span className="txt-brand">PKM-PM | Universitas Muhammadiyah Malang</span>
               </span>
               <BtnLogout size="large" />
            </header>
      
            <div className="courses-container">
               <h2 className="course-title">Courses</h2>
               { !data.length && (<span>Tidak ada video</span>) }
               { data.length > 0 && <FilterCategory data={data} setFilter={setFilter} /> }
               { data.length > 0 && (
                  <div className="courses">
                  {
                     data
                     .filter(el => {
                      if(filter === false){
                        return true
                      }
                      return el.tags.includes(filter)
                     })
                     .map((id, index) => {
                        const linkVideo = `https://www.youtube.com/watch?v=${id.url}`
                        const linkThumb = `https://img.youtube.com/vi/${id.url}/maxresdefault.jpg`
                        const idVideo = `video-title-${index}`

                        const inpClassName = `input-file ip-${index}`

                        return (
                           <div className="course" key={index}>
                              <a href={linkVideo} target="_blank">
                                 <img src={linkThumb} alt="thumbnail" className="thumbnail"/>
                              </a>
                              <div className={inpClassName} style={{
                                display: "none"
                              }}>
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

                                 <button className="button btn btn-danger btn-close-addfile" onClick={function(event){
                                  const btnSubmits = document.querySelectorAll(".btn-submit")
                                  const inputFiles = document.querySelectorAll(".input-file")

                                  btnSubmits.forEach(el => el.style.display = "block")
                                  inputFiles.forEach(el => el.style.display = "none")

                                 }}>tutup</button>
                              </div>
                              <button className="submit-tugas btn btn-primary btn-submit w-100" onClick={function(event){
                                const btnSubmits = document.querySelectorAll(".btn-submit")
                                const inputFiles = document.querySelectorAll(".input-file")

                                btnSubmits.forEach(el => el.style.display = "block")
                                inputFiles.forEach(el => el.style.display = "none")

                                document.querySelector(`.ip-${index}`).style.display = "flex"

                                event.target.style.display = "none"

                              }}>Submit Tugas</button>
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