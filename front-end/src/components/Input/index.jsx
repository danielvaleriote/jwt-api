import "./Input.scss";

const Input = ({type, placeholder, label, required, handleChange}) => {
	return (
		label ? 
		
		<label className="input-label">
			{label}<br />
			<input type={type || "text"} placeholder={placeholder || ""} className="input" required={required} onChange={handleChange} autoComplete="off"/>
		</label> : 

		<input type={type || "text"} placeholder={placeholder || ""} className="input"  required={required} onChange={handleChange} autoComplete="off"/>
	);
};

export default Input;