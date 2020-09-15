//	Importing React main module and its features
import React, { useState, useEffect } from "react";

//	Importing React Router features
import { Link } from "react-router-dom";

//	Importing React Bootstrap features
import { CardDeck, Card, Col, Row, Image } from "react-bootstrap";

//	Importing api to communicate to backend
import api from "../../services/api";

// Importing default avatar
import avatar from "../../assets/avatar.png";

//	Exporting resource to routes.js
export default function Contacts({ userId }) {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";

	//  Defining state variables
	const [contacts, setContacts] = useState([]);

	//	Loading current user contacts
	useEffect(() => {
		async function fetchData() {
			await api.get("contacts", {
				headers: {
					Authorization: userId
				}
			}).then((response) => {
				setContacts(response.data);
			}).catch(() => {});
		}

		fetchData();
	}, [userId]);

	return (
		<div className="contacts-container h-100">
			<Row className="m-3 p-0">
				<Col sm>
					<h1 className="display-5">Meus contatos</h1>
				</Col>
				<Col sm className="text-right">
					<Link className="btn btn-primary my-0" to="/contacts/add">
						Novo contato
					</Link>
				</Col>
			</Row>

			<CardDeck className="bg-transparent m-3">
				{contacts.length ?
					contacts.map((contact) => (
						<Link key={contact._id} className="col-sm-2 text-light m-0 p-0" to={"/contacts/edit/" + contact._id}>
							<Card className="bg-transparent m-0">
								<Image
									className="mx-auto" src={avatar}
									alt="Avatar"
									style={{ filter: "saturate(9.9)" }}
									fluid
								/>
								<Card.Body>
									<Card.Title className="d-flex flex-column align-items-center p-2 h-100">
										<h5>{contact.name} {contact.surname}</h5>
									</Card.Title>
								</Card.Body>
							</Card>
						</Link>
					))
					:
					<h4 id="contactsField" className="text-light m-3">Nenhum contato registrado</h4>
				}
			</CardDeck>
		</div>
	);
}