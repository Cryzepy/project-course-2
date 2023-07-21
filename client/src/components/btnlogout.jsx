import { useNavigate } from "react-router-dom"
import deleteToken from "../utils/api/token.js"

const BtnLogout = ({username}) => {

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
	return (
		<span id="btn-logout" onClick={handleLogout}>Log Out ({username})</span>
	)
}

export default BtnLogout