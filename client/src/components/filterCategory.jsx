import { useState } from "react"

const FilterCategory = ({data,setFilter,filter}) => {

	const [show,setShow] = useState(false)
	const tags = []

	const x = data.filter(el => el.tags.length).forEach(el => {
		el.tags.forEach(innerEl => {
			if(!tags.includes(innerEl.toLowerCase())){
				tags.push(innerEl.toLowerCase())
			}

		})
	})

	const handleClick = event => {
		const iTarget = event.target.getAttribute("data-fc-i")

		document.querySelectorAll(".filter-child").forEach((el,index) => {
			if(iTarget == index){
				el.classList.add("active")
				if(index === 0){
					setFilter(false)
				}else{
					setFilter(el.innerText)
				}
			}else{
				el.classList.remove("active")
			}
		})
	}

	const handleShowEl = event => {
		setShow(prev => !prev)
	}

	return (<div className="text-center my-4">
		<button className="btn btn-primary" id="btn-show" onClick={handleShowEl}>
			<span className="ms-2">{show === true ? "hide tags" : "show tags"}</span>
		</button>

		{
			show === true &&
				<div className="scroller my-3">
					<span className="filter-child" onClick={handleClick} data-fc-i={0}>All</span>
					{ tags.map((tag,index) => <span className="filter-child" key={index} onClick={handleClick} data-fc-i={index+1}>{tag}</span>) }
				</div>
				
		}</div>)
}

export default FilterCategory