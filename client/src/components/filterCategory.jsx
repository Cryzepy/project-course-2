import { useState } from "react"

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

		document.querySelectorAll(".list-group-item.list-group-item-action").forEach((el,index) => {
			if(iTarget == index){
				if(index === 0){
					setFilter(false)
				}else{
					setFilter(el.innerText)
				}
			}
		})
	}

	return ( <>
		<p className="d-inline-flex gap-1 mt-4">
		  <a id="btn-tag" className="px-3 py-2 rounded btn-tag d-flex justify-content-center align-items-center bg-rainbow" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample" href="#collapseExample">
		  	<i className="bi bi-tag"></i>
		  </a>
		</p>
		<div className="collapse" id="collapseExample">
			<div className="list-group">
				<span className="list-group-item list-group-item-action" data-fc-i={0} onClick={handleClick}>All</span>
				{ tags.map((tag,index) => <span className="list-group-item list-group-item-action" key={index} onClick={handleClick} data-fc-i={index+1} data-fc-i={index+1}>{tag}</span>) }
			</div>
		</div>
	</>)
}

export default FilterCategory