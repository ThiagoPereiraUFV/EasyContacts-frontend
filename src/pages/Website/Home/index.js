//	Importing React main module
import React from "react";

//	Importing React Router features
import { Link } from "react-router-dom";

//	Importing page styles
import "./styles.css";

//	Exporting resource to routes.js
export default function Home() {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(0px)";
	
	//	Testing if user is logged in
	if(sessionStorage.getItem("userId")) {
		return (
			<div className="website-container">
				<div className="jumbotron m-5">
					<h1 className="display-3">EasyContacts</h1>
					<p className="lead">O seu gerenciador de contatos</p>
					<p className="my-4">Armazene seus contatos e leve-os para qualquer lugar com o EasyContacts, 
						abra agora uma conta e sincronize todos os seus contatos de forma rápida e gratuita.
					</p>
					<Link className="btn btn-primary btn-lg" to="/contacts">
						Acesse seus contatos
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div className="website-container">
				<div className="jumbotron m-5">
					<h1 className="display-3">EasyContacts</h1>
					<p className="lead">O seu gerenciador de contatos</p>
					<p className="my-4">Armazene seus contatos e leve-os para qualquer lugar com o EasyContacts, 
						abra agora uma conta e sincronize todos os seus contatos de forma rápida e gratuita.
					</p>
					<Link className="btn btn-primary btn-lg" to="/user/login">
						Acesse sua conta
					</Link>
				</div>
			</div>
		);
	}
}