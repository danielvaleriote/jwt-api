import "./Modal.scss";

const Modal = ({message, isError}) => {
	return (
		<div className="modal" style={{ backgroundColor: isError ? "#dc3545" : "#648DE5"}}>
			<h4 className="modalMessage">{message}</h4>
		</div>
	);
};

export default Modal;