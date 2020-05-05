//	Importing React main module
import React from "react";

//	Importing React Router features
import { Link } from "react-router-dom";

//	Importing page styles
import "./styles.css";

//	Exporting resource to routes.js
export default function Error404() {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(0px)";
	
	return (
		<div className="website-container">
			<div className="jumbotron m-4">
				<h1 class="display-3">Erro 404 - Página não encontrada</h1>
				<p class="lead">A página que você procura não existe, desculpe pelo transtorno</p>
				<Link className="btn btn-primary btn-lg" to="/">
					Voltar ao inicio
				</Link>
			</div>
		</div>
	);
}