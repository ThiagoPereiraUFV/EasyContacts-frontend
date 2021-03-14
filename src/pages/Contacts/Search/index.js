//	Importing React main module and its features
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//	Importing React Router features
import { Link } from "react-router-dom";

//	Importing React Bootstrap features
import { Container } from "react-bootstrap";

//	Importing query-string handle feature
import queryString from "query-string";

//	Importing api to communicate to backend
import api from "../../../services/api";

// Importing default avatar
import avatar from "../../../assets/avatar.png";

//	Exporting resource to routes.js
export function SearchContact({ userId, location }) {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";

	//  Defining state variables
	const [contacts, setContacts] = useState([]);
	const searchQuery = queryString.parse(location.search).q;
	/*
	//	Message settings
	const [toastShow, setToastShow] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	*/
	//	Loading current user contacts given search query
	useEffect(async () => {
		await api.get("/searchContacts?q=" + searchQuery, {
			headers: {
				"X-Access-Token": userId
			}
		}).then((response) => {
			if(response && response.status) {
				setContacts(response.data);
			}
		}).catch(() => {
			setContacts([]);
		});
	}, [userId, searchQuery]);

	return (
		<Container fluid>
			<header className="row align-items-center justify-content-between m-3 p-0">
				<div className="col-sm m-0 p-0">
					<h1 className="display-5">{"Resultados para busca de \"" + searchQuery + "\""}</h1>
				</div>
			</header>

			<div className="card-deck bg-transparent m-0">
				{contacts.length ?
					contacts.map((contact) => (
						<Link key={contact._id} className="col-sm-3 text-light m-0 p-0" to={"/contacts/edit/" + contact._id}>
							<div className="card bg-transparent m-0">
								<img className="img-thumbnail rounded mx-auto" src={avatar} alt="Avatar"/>
								<div className="d-flex flex-column align-items-center p-2 h-100">
									<h5 className="card-title my-1">{contact.name} {contact.surname}</h5>
								</div>
							</div>
						</Link>
					))
					:
					<h4 id="contactsField" className="text-light m-3">Nenhum contato encontrado</h4>
				}
			</div>
		</Container>
	);
}

SearchContact.propTypes = {
	userId: PropTypes.string.isRequired,
	location: PropTypes.object.isRequired
};