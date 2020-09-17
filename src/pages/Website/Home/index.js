//	Importing React main module
import React from "react";
import PropTypes from "prop-types";

//	Importing React Router features
import { Link } from "react-router-dom";

//	Importing React Bootstrap features
import { Jumbotron } from "react-bootstrap";

//	Exporting resource to routes.js
export default function Home({ userId }) {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(0px)";

	return (
		<div className="website-container d-flex h-100">
			<Jumbotron
				className="my-auto ml-5"
				style={{ width: "65%" }}
			>
				<h1 className="display-3">EasyContacts</h1>
				<p className="lead">
					O seu gerenciador de contatos
				</p>
				<p className="my-4">
					Armazene seus contatos e leve-os para qualquer lugar com o EasyContacts.
					Abra agora uma conta e sincronize todos os seus contatos de forma rápida e gratuita.
				</p>
				{userId ?
					<Link className="btn btn-primary btn-lg" to="/contacts">
						Meus contatos
					</Link>
					:
					<Link className="btn btn-primary btn-lg" to="/login">
						Acessar conta
					</Link>
				}
			</Jumbotron>
		</div>
	);
}

Home.propTypes = {
	userId: PropTypes.string.isRequired
};