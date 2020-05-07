//	Importing React main module and its features
import React, { useState, useEffect } from "react";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Importing query-string handle feature
import queryString from "query-string";

//	Importing api to communicate to backend
import api from "../../../services/api";

//	Importing page styles
import "./styles.css";

//	Exporting resource to routes.js
export default function Search({location}) {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";
	
	//  Defining state variables
	const [contacts, setContacts] = useState([]);

	//	Getting search query
	const search_query = queryString.parse(location.search).search_query;
	
	//	Defining history to jump through pages
	const history = useHistory();
	
	//	Testing if query string is not defined
	if(!search_query) {
		history.push("/contacts");
	} else if(search_query.length === 0) {
		alert("Type a name to start your search!");
		history.push("/contacts");
	}
	
	//	Loading current user contacts given search query
	useEffect(() => {
		api.get("contactsSearch?search_query=" + search_query, {
			headers: {
				Authorization: sessionStorage.getItem("userId")
			}
		}).then((response) => {
			setContacts(response.data);
		}).catch((error) => {
			alert(error.response.data);
			
			history.push("/");
		});
	}, [search_query, history]);

	//	Testing if user is logged in
	if(sessionStorage.getItem("userId")) {
		//	Testing if search has any contact
		if(contacts.length > 0) {
			return (
				<div className="contacts-container">
					<header className="row align-items-center justify-content-between m-3 p-0">
						<div className="col-sm m-0 p-0">
							<h1 className="display-3">Resultados para busca de "{search_query}"</h1>
						</div>
					</header>

					<div className="card-deck bg-transparent m-0">
						{contacts.map((contact) => (
							<Link key={contact._id} className="col-sm-3 text-light m-0 p-0" to={"/contacts/edit/" + contact._id}>
								<div className="card bg-transparent m-0">
									<img className="img-thumbnail rounded mx-auto" src="/avatar.png" alt="Avatar"/>
									<div className="d-flex flex-column align-items-center p-2 h-100">
										<h5 className="card-title my-1">{contact.name} {contact.surname}</h5>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			);
		} else {
			return (
				<div className="contacts-container">
					<header className="row align-items-center justify-content-between m-3 p-0">
						<h1 className="display-3">Resultados para busca de "{search_query}"</h1>
					</header>

					<div className="card bg-transparent m-0">
						<h4 className="text-light m-3">Nenhum contato encontrado</h4>
					</div>
				</div>
			);
		}
	} else {
		alert("You must log in before accessing this page!");
		history.push("/user/login");

		return null;
	}
}