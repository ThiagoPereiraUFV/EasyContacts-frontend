//	Importing React main module and its features
import React, { useState } from "react";
import PropTypes from "prop-types";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

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
			history.push("/contacts?q=" + searchQuery);

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
			<Navbar className="py-0 m-0" bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Nav.Link as={Link} to="/" href="/" className="navbar-brand text-white">
					EasyContacts
				</Nav.Link>
				<Navbar.Toggle className="bg-dark" aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Item>
							<Nav.Link
								as={Link}
								to="/user"
								href="/user"
								className="nav-link mx-2"
							>
								Perfil
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								as={Link}
								to="/contacts"
								href="/contacts"
								className="nav-link mx-2"
							>
								Contatos
							</Nav.Link>
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
							<Nav.Link
								as={Link}
								to="#"
								href="#"
								onClick={handleLogout}
								className="nav-link mx-2"
							>
								Sair
							</Nav.Link>
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