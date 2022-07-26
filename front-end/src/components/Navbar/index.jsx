import "./Navbar.scss";
import { Link } from "react-router-dom"

import { useContext } from "react";
import authContext from "../../context/authContext";

const Navbar = () => {
	const context = useContext(authContext);

	return (
		<nav className="navbar">
			<ul className="left-items nav-list">
				<Link className="nav-item" to="/">Início</Link>
			</ul>
			<ul className="right-items nav-list">
				<Link className="nav-item" to="/login">Login</Link>
				<Link className="nav-item" to="/register">Cadastrar-se</Link>
			</ul>
		</nav>
	);
};

export default Navbar;