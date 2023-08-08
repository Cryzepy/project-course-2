import { BrowserRouter, Routes, Route } from "react-router-dom"

import Course from "./pages/course.jsx"
import LoginPage from "./pages/login.jsx"
import Admin from "./pages/admin.jsx"

import AOS from "aos"
import 'aos/dist/aos.css'

function App () {

	AOS.init({
		mirror: false
	})

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/course" element={<Course />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App