import { useState } from "react";
import CredentialsPrompt from '../components/CredentialsPrompt';

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
		if (!email || !password) return alert("Você precisa fornecer um e-mail e uma senha.");

	};

	return (
		<div>
			<CredentialsPrompt buttonText="Registrar" handleSubmit={submitHandler} setEmail={setEmail} setPassword={setPassword} />
		</div>
	);
};

export default Register;