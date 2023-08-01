import $ from "jquery"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

import "../css/course.css"

import Footer from "../components/footer.jsx"
import BtnLogout from "../components/btnlogout.jsx"
import FilterCategory from "../components/filterCategory.jsx"
import Navbar from "../components/navbar.jsx"
import Modal from "../components/modal.jsx"

import tokenUtil from "../utils/api/token.js"
import videoUtil from "../utils/api/video.js"
import google from "../utils/api/google.js"

const CoursePage = () => {

  const navigate = useNavigate()
  let index = 0

  function getCookie (name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }

  const [data, setData] = useState([])
  const [filter,setFilter] = useState(false)

   useEffect(() => {
      const token = getCookie("token")
      tokenUtil.getToken(token,{ navigate })
      if (index === 0) {
        videoUtil.getAll(setData)
      }
      index++
   },[])

   useEffect(() => {

    const title = document.querySelectorAll(".title")
    const channelTitle = document.querySelectorAll(".channel-name")
    const deskripsi = document.querySelectorAll(".deskripsi-video")

    if(index === 0 && title != null && title.length && channelTitle != null && channelTitle.length && deskripsi != null && deskripsi.length){
      title.forEach((el,inc) => {
        const url = el.dataset.setUrl
        google.setElement(url,document.querySelector(`#title-${inc}`),document.querySelector(`#channel-name-${inc}`),document.querySelector(`#deskripsi-video-${inc}`))
      })
    }
   },[data])


	return (
      <> 
        <Navbar brand={"PKM-PM | Universitas Muhammadiyah Malang"} />
            <div className="container-fluid pb-5">
              <div className="row">
                <div className="col p-0 m-0 pt-1">
                  <h2 className="course-title text-start fw-bold text-light bg-primary p-3">
                    COURSES : <span id="courseTitle">{filter === false ? "ALL" : filter.toUpperCase()}</span>
                 </h2>
                </div>
              </div>
              <div className="row">
                <div className="filter-container col align-items-end d-flex flex-column top-0 bottom-0 position-relative">
                  { data.length > 0 && <FilterCategory data={data} setFilter={setFilter} filter={filter} /> }
                </div>
              </div>
              <div className="row">
                <div className="col">
                  { !data.length && (<span>Tidak ada video</span>) }
                  { data.length > 0 && (
                    <div className="courses">
                    {
                       data
                       .map((id, index) => {
                          const linkThumb = `https://i.ytimg.com/vi/${id.url}/hqdefault.jpg`

                          const title_el = document.querySelector(`#title-${index}`)
                          const desc_el = document.querySelector(`#deskripsi-video-${index}`)

                          return (
                            <>
                            { (id.tags.includes(filter) || filter === false) &&
                              <>
                              <Modal
                                url={id.url}
                                index={index} 
                                title={ title_el && title_el.innerText } 
                                deskripsi={ desc_el && desc_el.innerText } 
                                linkTugas={id.linkTugas}

                              />
                               <div className="course" key={index}>
                                  <a data-bs-toggle="modal" data-bs-target={`#modal-video-${index}`} target="_blank" className="thumbnail-container">
                                     <img src={linkThumb} alt="thumbnail" className="thumbnail"/>
                                  </a>
                                  <span className="title" id={"title-"+index} data-set-url={id.url}>Judul Tidak Tersedia</span>
                                  <span id={`deskripsi-video-${index}`} className="deskripsi-video" style={{ display: "none" }}>Deskripsi Tidak Tersedia</span>
                                  <span className="channel-name" id={`channel-name-${index}`}>Channel</span>
                               </div>
                              </>
                            }
                            </>
                          )
                       })
                    }
                    </div>
                    )
                  }
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Footer />
                </div>
              </div>
            </div>
            </>
            )
}

export default CoursePage