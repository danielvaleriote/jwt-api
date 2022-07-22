import "./Input.scss";

const Input = ({type, placeholder, label, required, handleChange, value}) => {
	return (
		label ? 
		
		<label className="input-label">
			{label}<br />
			<input type={type || "text"} placeholder={placeholder || ""} className="input" required={required} onChange={handleChange} autoComplete="off" value={value}/>
		</label> : 

			<input type={type || "text"} placeholder={placeholder || ""} className="input" required={required} onChange={handleChange} autoComplete="off" value={value}/>
	);
};

export default Input;