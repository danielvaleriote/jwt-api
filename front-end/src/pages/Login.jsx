import { useState } from "react";
import CredentialsPrompt from '../components/CredentialsPrompt';
import sendCredentials from "../utils/sendCredentials";

import Modal from "../components/Modal";
import { showModal, defaultModalState } from "../utils/modal";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modal, setModal] = useState(defaultModalState);

	const submitHandler = (e) => {
		e.preventDefault();
		if (!email || !password) return alert("Você precisa fornecer um e-mail e uma senha.");

		email.trim();

		sendCredentials("/login", {email, password});
	};

	return (
		<div>
			<CredentialsPrompt
				handleSubmit={submitHandler}
				setEmail={setEmail}
				setPassword={setPassword}
				role="login"
			/>
			{ modal.isOpen && <Modal message={modal.message} isError={modal.isError} /> }
		</div>
	);
};

export default Login;