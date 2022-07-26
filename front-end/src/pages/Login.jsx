import { useState, useContext } from "react";
import CredentialsPrompt from '../components/CredentialsPrompt';
import sendCredentials from "../utils/sendCredentials";
import authContext from "../context/authContext";

import Modal from "../components/Modal";
import { showModal, defaultModalState } from "../utils/modal";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modal, setModal] = useState(defaultModalState);

	const context = useContext(authContext);
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		
		if (!email || !password) return alert("Você precisa fornecer um e-mail e uma senha.");

		email.trim();

		sendCredentials("login", {email, password})
			.then(({ data }) => {

				const token = data.accessToken;
				api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

			})
			.catch(err => {
				let errMessage;
				switch(err.response.status) {
					case 404:
						errMessage = "Email não cadastrado.";
						break;
					case 403:
						errMessage = "Senha incorreta.";
						break;
					default:
						errMessage = "Algum erro ocorreu.";
					};

				showModal(modal, setModal, errMessage, true);
				console.error(err);
			});
	};

	return (
		<div>
			<CredentialsPrompt
				handleSubmit={submitHandler}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				role="login"
			/>
			{ modal.isOpen && <Modal message={modal.message} isError={modal.isError} /> }
		</div>
	);
};

export default Login;