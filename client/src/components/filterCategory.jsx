import { useState } from "react"

const FilterCategory = ({data,setFilter}) => {

	const [tagActive, setTagActive] = useState(0)
	const tags = []

	const x = data.filter(el => el.tags.length).forEach(el => {
		el.tags.forEach(innerEl => {
			if(!tags.includes(innerEl.toLowerCase())){
				tags.push(innerEl.toLowerCase())
			}

		})
	})

	const styleContainer = {
		backgroundColor: "#56d8e4",
		display: "flex",
		flexWrap: "wrap",
		padding: "7px",
		gap: "3px",
		justifyContent: "center"
	}

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

	return (
		<div style={styleContainer} className="scroller my-3">
			<span className="filter-child" onClick={handleClick} data-fc-i={0}>All</span>
			{ tags.map((tag,index) => <span className="filter-child" key={index} onClick={handleClick} data-fc-i={index+1}>{tag}</span>) }
		</div>
	)
}

export default FilterCategory