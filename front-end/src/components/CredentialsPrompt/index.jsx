import "./CredentialsPrompt.scss";
import Input from "../Input";
import Button from "../Button";

const CredentialsPrompt = ({ handleSubmit, buttonText, setEmail, setPassword}) => {
	const handleEmailInputChange = (e) => setEmail(e.target.value);
	const handlePasswordInputChange = (e) => setPassword(e.target.value);

	return (
		<form className='credentials-prompt' onSubmit={handleSubmit}>
			<Input type="text" placeholder="Digite o email" label="Email:" required={true} handleChange={handleEmailInputChange}/>
			<Input type="password" placeholder="Digite a senha" label="Senha:" required={true} handleChange={handlePasswordInputChange} />
			<Button>{buttonText}</Button>
		</form>
	);
};

export default CredentialsPrompt;