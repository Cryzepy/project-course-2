import "../css/course.css"
import logo from "../images/Logo PKM PM 1.jpg"

const Course = () => {
	return (
		<>
			 <header>
         <span class="brand">
            <img src={logo} alt="Logo PKM PM 1" />
            <span class="txt-brand">PKM-PM | Universitas Muhammadiyah Malang</span>
         </span>
         <span id="btn-logout">Log Out (usernmae)</span>
      </header>

      <div class="courses-container">
         <h2 class="course-title">Courses</h2>
            <span>Tidak ada video</span>
            <div class="courses">
                  <div class="course">
                     <a href="https://www.youtube.com/watch?v=<%=id.idVideo%>">
                        <img src="https://img.youtube.com/vi/<%=id.idVideo%>/maxresdefault.jpg" alt="thumbnail" width="320" height="180" />
                     </a>
                  </div>
            </div>
      </div>

      <footer>PKM-PM | Universitas Muhammadiyah Malang © 2023</footer>
		</>
	)
}

export default Course
