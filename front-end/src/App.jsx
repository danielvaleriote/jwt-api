import './App.scss';
import { useState } from "react";
import CredentialsPrompt from './components/CredentialsPrompt';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if(!email || !password) return alert("Você precisa fornecer um e-mail e uma senha.");

  };

  return (
    <div className="App">
      <CredentialsPrompt buttonText="Registrar" handleSubmit={submitHandler} setEmail={setEmail} setPassword={setPassword}/>
    </div>
  )
}

export default App;
