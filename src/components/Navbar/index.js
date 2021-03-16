//	Importing React main module and its features
import React, { useState } from "react";
import PropTypes from "prop-types";

//	Importing React Router features
import { NavLink, useHistory } from "react-router-dom";

//	Importing React Bootstrap features
import { Navbar, Nav, Form } from "react-bootstrap";

//	Exporting resource to routes.js
export function WebNavbar({ userId, setUserId, setUser }) {
	//  Defining state variables
	const [searchQuery, setSearchQuery] = useState("");

	//	Defining history to jump through pages
	const history = useHistory();

	//	Function to handle contact search
	async function handleSearch(event) {
		event.preventDefault();

		try {
			history.push("/contacts/search?q=" + searchQuery);

			setSearchQuery("");
		} catch(error) {
			alert(error);
		}
	}

	//	Function to handle user logout
	function handleLogout(event) {
		event.preventDefault();

		try {
			sessionStorage.removeItem("userId");
			setUserId(sessionStorage.getItem("userId"));
			setUser(null);

			history.push("/");
		} catch(error) {
			alert(error);
		}
	}

	//	Testing if user is logged in
	if(userId && userId.length) {
		return (
			<Navbar className="py-0 m-0" bg="dark" variant="dark" expand="lg">
				<NavLink to="/" className="navbar-brand text-white">
					EasyContacts
				</NavLink>
				<Navbar.Toggle className="bg-dark" aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Item>
							<NavLink
								exact activeClassName="activeRoute"
								activeStyle={{ color: "white" }}
								to="/user"
								className="nav-link mx-2"
							>
								Perfil
							</NavLink>
						</Nav.Item>
						<Nav.Item>
							<NavLink
								activeClassName="activeRoute"
								activeStyle={{ color: "white" }}
								to="/contacts"
								className="nav-link mx-2"
							>
								Contatos
							</NavLink>
						</Nav.Item>
					</Nav>
					<Form onSubmit={handleSearch} inline>
						<Form.Control
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Busque aqui"
							className="mr-sm-2"
						/>
					</Form>
					<Nav className="ml-auto">
						<Nav.Item>
							<NavLink
								exact activeClassName="activeRoute"
								to="#"
								onClick={handleLogout}
								className="nav-link mx-2"
							>
								Sair
							</NavLink>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	} else {
		return null;
	}
}

WebNavbar.propTypes = {
	userId: PropTypes.string,
	setUserId: PropTypes.any.isRequired,
	setUser: PropTypes.any.isRequired
};