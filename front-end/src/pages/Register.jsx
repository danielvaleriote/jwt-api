import { useState } from "react";
import CredentialsPrompt from '../components/CredentialsPrompt';
import sendCredentials from "../utils/sendCredentials";

import Modal from "../components/Modal";
import { showModal, defaultModalState } from "../utils/modal";


const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modal, setModal] = useState(defaultModalState);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (!email || !password) return alert("Você precisa fornecer um e-mail e uma senha.");

		email.trim();

		sendCredentials("/register", { email, password })
			.then((res) => {
				console.log(res);
				showModal(modal, setModal, "Cadastrado com sucesso.");
			})
			.catch(err => {
				let errorMessage;

				switch(err.response.status) {
					case 409: 
						errorMessage = "Email já cadastrado";
						break
					case 422: 
						errorMessage = "Email inválido.";
						break
					default: 
						errorMessage = "Algum erro ocorreu";
				}

				showModal(modal, setModal, errorMessage, true);
				console.error(err);
			});
	};

	return (
		<div>
			<CredentialsPrompt
				handleSubmit={submitHandler} 
				setEmail={setEmail} 
				setPassword={setPassword} 
				role="register" 
			/>
			{ modal.isOpen && <Modal message={modal.message} isError={modal.isError}/> }
		</div>
	);
};

export default Register;