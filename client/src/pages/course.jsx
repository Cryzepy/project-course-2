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
  const [label,setLabel] = useState([])

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
    const channelTitle = document.querySelectorAll(".channel")
    const deskripsi = document.querySelectorAll(".deskripsi")
    
    if((title != null && channelTitle != null && deskripsi != null && !label.length) || (title.length != channelTitle.length || title.length != deskripsi.length || title.length != deskripsi.length)){
      title.forEach((el,inc) => {
        const url = el.dataset.setUrl
        google.setElement(url,setLabel,inc)
      })
    }


  })

  function getvalue (obj,index,props) {

    let result

    try {
      result = obj[index][props]
    } catch {
      result = false
    }

    return result
  }

	return (
      <> 
        <Navbar brand={"PKM-PM | Universitas Muhammadiyah Malang"} />
            <div className="container-fluid pb-5">
              <div className="row">
                <div className="col p-0 m-0 pt-1 mt-3 mt-lg-0">
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
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4 m-1">
                    {
                       data
                       .map((id, index) => {
                          const linkThumb = `https://i.ytimg.com/vi/${id.url}/hqdefault.jpg`

                          const desc_el = document.querySelector(`#deskripsi-video-${index}`)

                          return (
                            <>
                            { (id.tags.includes(filter) || filter === false) &&
                              <>
                              <Modal
                                url={id.url}
                                index={index} 
                                title={ getvalue(label,index,"title") } 
                                deskripsi={ getvalue(label,index,"description") } 
                                linkTugas={id.linkTugas}

                              />
                              <div className="col" key={index}>
                                <div className="card p-3" style={{ height: "100%" }}>
                                  <a data-bs-toggle="modal" data-bs-target={`#modal-video-${index}`} target="_blank" className="thumbnail-container">
                                    <img src={ linkThumb } className="card-img-top" alt="thumbnail" style={{ cursor: "pointer" }} />
                                  </a>
                                  <div className="card-body">
                                    <h5 className="card-title fw-bold fs-6 channel">{ getvalue(label,index,"channelTitle") || "Youtube" }</h5>
                                    <p className="card-text title" data-set-url={id.url}>{ getvalue(label,index,"title") || "Judul Tidak Tersedia" }</p>
                                  </div>
                                </div>
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