import { useState, useEffect } from "react"

const FilterCategory = ({data,setFilter,filter}) => {

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
		document.querySelectorAll(".tag-select").forEach((el,index) => {
			if(iTarget == index){
				if(index === 0){
					setFilter(false)
				}else{
					setFilter(el.innerText)
				}
			}
		})
	}

	return (
		<div className="dropdown">
		  <button className="btn bg-rainbow text-light border-bottom border-start" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ outline: "none", border: "none" }}>
		    <i className="bi bi-tag"></i>
		  </button>
		  <ul className="dropdown-menu text-center">
		    <li data-fc-i={0} onClick={handleClick} className="dropdown-item p-2 btn tag-select">All</li>
			{ tags.map((tag,index) => <li data-fc-i={index+1} onClick={handleClick} className="dropdown-item p-2 btn tag-select" key={index}>{ tag }</li>) }
		  </ul>
		</div>
	)
}

export default FilterCategory