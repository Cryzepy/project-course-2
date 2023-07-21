import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import $ from "jquery"

import Footer from "../components/footer.jsx"
import BtnLogout from "../components/btnlogout.jsx"
import ErrorPage from "../pages/404.jsx"
import "../css/admin.css"
import UserList from "../components/userList.jsx"
import VideoList from "../components/videoList.jsx"

import tokenUtil from "../utils/api/token.js"
import userUtil from "../utils/api/user.js"
import videoUtil from "../utils/api/video.js"


import logo from "../images/Logo PKM PM 1.jpg"

const AdminPage = () => {

  const navigate = useNavigate()

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const tabs = ["user","video","file upload"]

  const [tabActive,setTabActive] = useState(tabs[0])

  const [username,setUsername] = useState("")

  const [users,setUsers] = useState(false)
  const [videos,setVideos] = useState(false)

  useEffect(() => {
    const token = getCookie("token")
    
    tokenUtil.getToken(token,{ navigate, setUsername })
    userUtil.getAll({ setUsers })
    
  },[])

  function getVideos(){
    videoUtil.getAll(setVideos)
  }

	return (
    <>
    {
      users == false ? <ErrorPage /> : (
        <>
          <header>
           <span className="brand">
              <img src={logo} alt="Logo PKM PM 1" />
              <span className="txt-brand">ADMIN Panel</span>
           </span>
           <BtnLogout username={username} />
        </header>

        <main>
          <div className="selected-menu">
            {
              tabs.map((tab,index) => {
                const cl = tabActive == tab ? "active" : ""
                return <span className={cl} key={index} onClick={function(e){
                  setTabActive(tab)
                  getVideos()
                }}>{tab}</span>
              })
            }
          </div>
          { tabActive === tabs[0] && <UserList users={users} setUsers={setUsers} />}
          { tabActive === tabs[1] && <VideoList videos={videos} setVideos={setVideos} />}
    </main>
    <Footer />
        </>
      )

    }
    </>
	)
}

export default AdminPage