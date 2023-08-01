import Logout from "./btnlogout.jsx"
import logo from "../images/Logo PKM.png"

const Navbar = ({brand}) => {
	return (
		<>
			<Logout size="small" />
            <header className="m-lg-3 rounded-lg-1 sticky-top z-3">
               <span className="brand">
                  <img src={logo} alt="Logo PKM PM 1" />
                  <span className="txt-brand">{brand}</span>
               </span>
               <Logout size="large" />
            </header>
		</>
	)
}

export default Navbar