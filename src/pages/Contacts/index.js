//	Importing React main module and its features
import React, { useState, useEffect } from "react";

//	Importing React Router features
import { Link } from "react-router-dom";

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
			}).catch((error) => {
				//alert(error.response.data);
			});
		}

		fetchData();
	}, [userId]);

	return (
		<div className="contacts-container h-100">
			<header className="row align-items-center justify-content-between m-3 p-0">
				<div className="col-sm m-0 p-0">
					<h1 className="display-5">Meus contatos</h1>
				</div>
				<div className="col-sm text-right m-0 p-0">
					<Link className="btn btn-primary my-0" to="/contacts/add">
						Novo contato
					</Link>
				</div>
				<hr/>
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
					<h4 id="contactsField" className="text-light m-3">Nenhum contato registrado</h4>
				}
			</div>
		</div>
	);
}