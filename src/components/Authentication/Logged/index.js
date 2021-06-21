//	Importing React main module and its features
import React from "react";

//	Importing React Router features
import { Link } from "react-router-dom";

//	Importing React Bootstrap features
import { Modal } from "react-bootstrap";

//	Exporting resource to routes.js
export function Logged() {
	return (
		<Modal show={true}>
			<Modal.Header>
				<Modal.Title>Aviso</Modal.Title>
			</Modal.Header>
			<Modal.Body>Saia da sua conta para ver este conteúdo!</Modal.Body>
			<Modal.Footer>
				<Link className="btn btn-primary" to="/user">
					<small>Fechar</small>
				</Link>
			</Modal.Footer>
		</Modal>
	);
}
