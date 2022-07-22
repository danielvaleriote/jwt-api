import "./CredentialsPrompt.scss";
import Input from "../Input";
import Button from "../Button";
import { Link } from "react-router-dom"

const CredentialsPrompt = ({ role, handleSubmit, setEmail, setPassword }) => {
	const handleEmailInputChange = (e) => setEmail(e.target.value);
	const handlePasswordInputChange = (e) => setPassword(e.target.value);

	let linkText;
	let linkTo;
	let title;
	let buttonText;

	switch(role) {
		case "login":
			linkText = "Não tem uma conta? Registre-se";
			linkTo = "register";
			title = "Entrar";
			buttonText = "Entrar";
			break;

		case "register":
			linkText = "Já tem uma conta? Faça login";
			linkTo = "login";
			title = "Registre-se";
			buttonText = "Registrar";
			break;
	}
	
	return (
		<form className='credentials-prompt' onSubmit={handleSubmit} >
			{ title && <h1 className="credentials-title">{title}</h1> }
			<Input type="text" placeholder="Digite o email" label="Email:" required={true} handleChange={handleEmailInputChange}/>
			<Input type="password" placeholder="Digite a senha" label="Senha:" required={true} handleChange={handlePasswordInputChange} />
			<Button>{buttonText}</Button>
			{linkTo && <Link to={"/" + linkTo} className="credentials-link">{linkText}</Link> }
		</form>
	);
};

export default CredentialsPrompt;