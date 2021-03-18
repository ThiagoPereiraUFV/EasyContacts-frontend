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
export function Signup({ setUserId, setUser }) {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";

	//  Defining state variables
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordC, setPasswordC] = useState("");

	//	Message settings
	const [toastShow, setToastShow] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	//	Defining history to jump through pages
	const history = useHistory();

	//	Function to handle user signup
	async function handleSignup(event) {
		event.preventDefault();

		const data = {
			name,
			email,
			password,
			passwordC
		};

		await api.post("/user", data)
			.then((response) => {
				if(response && response.status === 201) {
					sessionStorage.setItem("userId", response.data.token);

					setUserId(sessionStorage.getItem("userId"));
					setUser(response.data.user);

					history.push("/contacts");
				}
			}).catch((error) => {
				setTitle("Erro!");
				if(error.response && error.response.status === 400) {
					const messages = error.response.data;
					setMessage(messages.errors ? messages.errors.join(", ") : messages);
				} else if(error.response && error.response.status === 500) {
					setMessage(error.message);
				}
				setToastShow(true);
			});
	}

	return (
		<Container className="m-auto" fluid>
			<Push.Top toastShow={toastShow} setToastShow={setToastShow} message={message} title={title} />
			<Col className="my-2 mx-auto" xl="8" lg="10" md="10">
				<Jumbotron className="py-3">
					<h3>Abra sua conta:</h3>
					<Form onSubmit={handleSignup}>
						<Row>
							<Form.Group as={Col} controlId="name" md="6" sm>
								<Form.Label>Nome</Form.Label>
								<Form.Control
									placeholder="Seu nome"
									type="text"
									value={name}
									onChange={event => setName(event.target.value)}
									autoFocus
									required
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="email" md="6" sm>
								<Form.Label>Email</Form.Label>
								<Form.Control
									placeholder="Seu email"
									type="email"
									value={email}
									onChange={event => setEmail(event.target.value)}
									required
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="password" md="6" sm>
								<Form.Label>Senha</Form.Label>
								<Form.Control
									placeholder="Senha"
									type="password"
									value={password}
									onChange={event => setPassword(event.target.value)}
									required
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="passwordC" md="6" sm>
								<Form.Label>Confirmar Senha</Form.Label>
								<Form.Control
									placeholder="Confirme sua senha"
									type="password"
									value={passwordC}
									onChange={event => setPasswordC(event.target.value)}
									required
								/>
							</Form.Group>
							<Col className="text-center my-2" sm="12">
								<small>Já tem conta? </small>
								<Link className="text-light" to="/login">
									<small>Clique aqui</small>
								</Link>
								<small> para acessar</small>
							</Col>
							<Col className="text-center my-2" sm="12">
								<Button variant="primary" type="submit">
								Cadastrar
								</Button>
							</Col>
						</Row>
					</Form>
				</Jumbotron>
			</Col>
		</Container>
	);
}

Signup.propTypes = {
	setUserId: PropTypes.func.isRequired,
	setUser: PropTypes.func.isRequired
};