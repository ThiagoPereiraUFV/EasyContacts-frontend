//	Importing React main module and its features
import React, { useState } from "react";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Exporting resource to routes.js
export default function Navbar() {
	//  Defining state variables
	const [searchQuery, setSearchQuery] = useState("");
	
	//	Defining history to jump through pages
	const history = useHistory();

	//	Function to handle search contacts
	function searchContact(e) {
		e.preventDefault();

		try {
			history.push("/contacts/search?search_query=" + searchQuery);

			setSearchQuery("");
		} catch(error) {
			alert(error.response.data);
		}
	}

	//	Function to handle user logout
	function logoutUser(e) {
		e.preventDefault();

		try {
			sessionStorage.removeItem("userId");

			history.push("/");
		} catch(error) {
			alert(error.response.data);
		}
	}

	//	Testing if user is logged in
	if(sessionStorage.getItem("userId")) {
		return (
			<nav id="navbar-fixed" className="navbar navbar-expand-lg navbar-dark bg-dark py-0 m-0">
				<Link className="navbar-brand" to="/">
					EasyContacts
				</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<div className="row align-items-center justify-content-between m-0 w-100">
						<ul className="navbar-nav align-items-center">
							<li className="nav-item mx-1">
								<Link className="nav-link" to="/user">
									Meu Perfil
								</Link>
							</li>
							<li className="nav-item mx-1">
								<Link className="nav-link" to="/contacts">
									Contatos
								</Link>
							</li>
							<li className="nav-item mx-1">
								<form className="form-inline" onSubmit={searchContact}>
									<input 
										type="search" 
										className="form-control search bg-dark mr-sm-2 py-0" 
										name="search" 
										placeholder="Procure uma pessoa"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
								</form>
							</li>
						</ul>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="#" onClick={logoutUser}>
									Sair
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	} else {
		return null;
	}
}