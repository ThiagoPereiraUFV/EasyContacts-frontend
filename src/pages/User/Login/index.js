//	Importing React main module and its features
import React, { useState } from "react";
import PropTypes from "prop-types";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Importing React Bootstrap features
import { Jumbotron, Form, Button, Col, Row, Container } from "react-bootstrap";

//	Importing components
import { Push } from "../../../components/Push";

//	Importing api to communicate to backend
import api from "../../../services/api";

//	Exporting resource to routes.js
export function Login({ setUserId, setUser }) {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";

	//  Defining state variables
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//	Message settings
	const [toastShow, setToastShow] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	//	Defining history to jump through pages
	const history = useHistory();

	//	Function to handle user login
	async function handleLogin(event) {
		event.preventDefault();

		await api.post("/session", { email, password })
			.then((response) => {
				if(response && response.status === 201) {
					sessionStorage.setItem("userId", response.data.token);

					setUserId(sessionStorage.getItem("userId"));
					setUser(response.data.user);

					history.push("/contacts");
				}
			}).catch((error) => {
				setTitle("Erro!");
				if(error.response && [400, 404].includes(error.response.status)) {
					setMessage(error.response.data);
				} else if(error.response && error.response.status === 500) {
					setMessage(error.message);
				}
				setToastShow(true);
			});
	}

	return (
		<Container className="m-auto" fluid>
			<Push.Top toastShow={toastShow} setToastShow={setToastShow} message={message} title={title} />
			<Col className="my-2 mx-auto" lg="4" md="6">
				<Jumbotron className="py-3">
					<h3>Acesse sua conta:</h3>
					<Form onSubmit={handleLogin}>
						<Row>
							<Form.Group as={Col} controlId="email" sm="12">
								<Form.Label>Email</Form.Label>
								<Form.Control
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									type="email"
									placeholder="email@provedor.com"
									autoFocus
									required
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="password" sm="12">
								<Form.Label>Senha</Form.Label>
								<Form.Control
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									type="password"
									placeholder="Senha"
									required
								/>
							</Form.Group>
							<Col className="text-center my-2" sm="12">
								<small>Não tem conta? </small>
								<Link className="text-light" to="/signup">
									<small>Clique aqui</small>
								</Link>
								<small> para se cadastrar</small>
							</Col>
							<Col className="text-center my-2" sm="12">
								<Button variant="primary" type="submit">
								Acessar
								</Button>
							</Col>
						</Row>
					</Form>
				</Jumbotron>
			</Col>
		</Container>
	);
}

Login.propTypes = {
	setUserId: PropTypes.func.isRequired,
	setUser: PropTypes.func.isRequired
};
