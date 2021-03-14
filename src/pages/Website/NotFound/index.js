//	Importing React main module
import React from "react";

//	Importing React Router features
import { Link } from "react-router-dom";

//	Importing React Bootstrap features
import { Jumbotron } from "react-bootstrap";

//	Exporting resource to routes.js
export function NotFoundPage() {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(0px)";

	return (
		<div className="d-flex h-100">
			<Jumbotron
				className="my-auto ml-5"
				style={{ width: "65%" }}
			>
				<h1 className="display-3">Erro 404 - Página não encontrada</h1>
				<p className="lead">A página que você procura não existe, desculpe pelo transtorno</p>
				<Link className="btn btn-primary btn-lg" to="/">
					Voltar ao inicio
				</Link>
			</Jumbotron>
		</div>
	);
}