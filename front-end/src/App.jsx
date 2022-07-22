import './App.scss';
import {useContext} from "react";
import authContext from './context/authContext';

function App() {

  const context = useContext(authContext)

  return (
    <div id="app"></div>
  )
}

export default App;
