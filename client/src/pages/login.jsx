import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import $ from "jquery"

import tokenUtil from "../utils/api/token.js"
import userUtil from "../utils/api/user.js"

import "../css/login.css"
import logo from "../images/Logo PKM.png"

const LoginPage = () => {

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const navigate =  useNavigate()

  useEffect(() => {
    const token = getCookie("token")
    tokenUtil.getToken(token, { navigate })
  },[])

   const handleSubmit = (e) => {

      const payload = {
         username: $("#username").val(),
         password: $("#password").val()
      }
      
      userUtil.auth(payload,{ navigate })

   }

	return (
      <div className="center">
         <div className="container">
          <div className="brand d-flex justify-content-center">
            <img src={logo} alt="logo" />
          </div>
            <div className="form">
               <div className="data">
                  <label>Username</label>
                  <input type="text" id="username" required onKeyUp={function(e){
                    if(e.code === "Enter") handleSubmit()
                  }} />
               </div>
               <div className="data">
                  <label>Password</label>
                  <input type="password" id="password" required onKeyUp={function(e){
                    if(e.code === "Enter") handleSubmit()
                  }} />
               </div>
                <button type="submit" className="btn btn-primary w-100 py-3" id="submit" onClick={handleSubmit}>Log In</button>
            </div>
         </div>
      </div>
	)
}

export default LoginPage