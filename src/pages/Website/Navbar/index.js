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
			<nav id="navbar-fixed" class="navbar navbar-expand-lg navbar-dark bg-dark py-0 m-0">
				<Link class="navbar-brand" to="/">
					EasyContacts
				</Link>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<div class="row align-items-center justify-content-between w-100">
						<ul class="navbar-nav align-items-center">
							<li class="nav-item mx-1">
								<Link class="nav-link" to="/user">
									Meu Perfil
								</Link>
							</li>
							<li class="nav-item mx-1">
								<Link class="nav-link" to="/contacts">
									Contatos
								</Link>
							</li>
							<li class="nav-item mx-1">
								<form class="form-inline" onSubmit={searchContact}>
									<input 
										class="form-control search bg-dark mr-sm-2 py-0" 
										name="search" 
										placeholder="&#128270; Procure uma pessoa"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
								</form>
							</li>
						</ul>
						<ul class="navbar-nav">
							<li class="nav-item">
								<Link class="nav-link" to="#" onClick={logoutUser}>
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