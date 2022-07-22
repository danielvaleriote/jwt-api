import { useState } from "react";
import CredentialsPrompt from '../components/CredentialsPrompt';
import sendCredentials from "../utils/sendCredentials";

import Modal from "../components/Modal";
import { showModal, defaultModalState } from "../utils/modal";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modal, setModal] = useState(defaultModalState);

	const submitHandler = (e) => {
		e.preventDefault();
		if (!email || !password) return alert("Você precisa fornecer um e-mail e uma senha.");

		email.trim();

		sendCredentials("/register", { email, password });
	};

	return (
		<div>
			<CredentialsPrompt buttonText="Registrar" handleSubmit={submitHandler} setEmail={setEmail} setPassword={setPassword} />
			{ modal.isOpen && <Modal message={modal.message} isError={modal.isError}/> }
		</div>
	);
};

export default Register;