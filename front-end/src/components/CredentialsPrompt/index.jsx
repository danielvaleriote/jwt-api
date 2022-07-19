import "./CredentialsPrompt.scss";
import Input from "../Input";
import Button from "../Button";

const CredentialsPrompt = ({ handleSubmit, buttonText, setEmail, setPassword}) => {
	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	return (
		<form className='credentials-prompt' onSubmit={handleSubmit}>
			<Input type="text" placeholder="Digite o endereço de e-mail" label="E-mail:" required={true} handleChange={handleEmailChange}/>
			<Input type="password" placeholder="Digite a senha" label="Senha:" required={true} handleChange={handlePasswordChange} />
			<Button>{buttonText}</Button>
		</form>
	);
};

export default CredentialsPrompt;