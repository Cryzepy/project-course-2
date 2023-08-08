const Modal = ({url,index,title,deskripsi,linkTugas}) => {
	const id = `modal-video-${index}`

	return (
		<div className="modal fade mt-0 mb-0" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div className="modal-dialog modal-dialog-scrollable" style={{ overflowX: "hidden" }}>
		    <div className="modal-content">
		      <div className="modal-header">
		        <h1 className="modal-title fs-5" id="exampleModalLabel">{ title ? title : "Judul tidak tersedia" }</h1>
		        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div className="modal-body d-flex flex-column gap-4">
		      	<a className="btn btn-success" href={`https://www.youtube.com/watch?v=${url}`} target="_blank"><i className="bi bi-film"></i>  watch now</a>
		      	<div>
			      	<h5 className="label fw-bold deskripsi">{ deskripsi ? "Description" : "Deskripsi Tidak Tersedia" }</h5>
			      	<span style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}>{ deskripsi ? deskripsi : "Deskripsi tidak tersedia" }</span>
		      	</div>
		      </div>
		      <div className="modal-footer">
		        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Tutup</button>
		        <a type="button" className={`btn btn-${ linkTugas ? "info text-light" : "primary"} ${!linkTugas && "disabled"}`} target="_blank" href={linkTugas}>{linkTugas ? "Upload Tugas" : "Tidak ada tugas"}</a>
		      </div>
		    </div>
		  </div>
		</div>
	)
}

export default Modal