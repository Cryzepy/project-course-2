import { useNavigate } from "react-router-dom"
import deleteToken from "../utils/api/token.js"

const BtnLogout = ({size}) => {

	const navigate = useNavigate()

	function getCookie(name) {
	    const value = `; ${document.cookie}`;
	    const parts = value.split(`; ${name}=`);
	    if (parts.length === 2) return parts.pop().split(';').shift();
	  }

	  const token = getCookie("token")

	const handleLogout = () => {
		deleteToken.deleteToken(token,{navigate})
	}

	const className = `btn rounded text-center ${size === "large" ? 'd-none d-lg-block' : 'd-block d-lg-none rounded-0 py-1'} btn-primary`

	return (
		<span id="btn-logout" className={className} onClick={handleLogout}>
			{ size === "large" ?  <i className="bi bi-power text-light"></i> : <span className="">Logout</span> }
			
		</span>
	)
}

export default BtnLogout