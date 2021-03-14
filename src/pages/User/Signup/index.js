//	Importing React main module and its features
import React, { useState } from "react";
import PropTypes from "prop-types";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Importing React Bootstrap features
import { Jumbotron, Form, Button, Col, Row } from "react-bootstrap";

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
		<div className="user-container d-flex justify-content-center align-items-center h-100">
			<Push.Top toastShow={toastShow} setToastShow={setToastShow} message={message} title={title} />
			<Jumbotron className="col-md-7 py-3 m-3">
				<h3>Abra sua conta:</h3>
				<Form className="py-2 d-flex flex-column h-100" onSubmit={handleSignup}>
					<Row className="d-flex justify-content-between">
						<Col sm>
							<Form.Group controlId="name">
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
						</Col>
						<Col sm>
							<Form.Group controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									placeholder="Seu email"
									type="email"
									value={email}
									onChange={event => setEmail(event.target.value)}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="d-flex justify-content-between">
						<Col sm>
							<Form.Group controlId="password">
								<Form.Label>Senha</Form.Label>
								<Form.Control
									placeholder="Senha"
									type="password"
									value={password}
									onChange={event => setPassword(event.target.value)}
									required
								/>
							</Form.Group>
						</Col>
						<Col sm>
							<Form.Group controlId="passwordC">
								<Form.Label>Confirmar Senha</Form.Label>
								<Form.Control
									placeholder="Confirme sua senha"
									type="password"
									value={passwordC}
									onChange={event => setPasswordC(event.target.value)}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="my-1">
						<Col className="text-center">
							<small>Já tem conta? </small>
							<Link className="text-light" to="/login">
								<small>Clique aqui</small>
							</Link>
							<small> para acessar</small>
						</Col>
					</Row>
					<Row className="my-3">
						<Col className="text-center">
							<Button variant="primary" type="submit">
								Cadastrar
							</Button>
						</Col>
					</Row>
				</Form>
			</Jumbotron>
		</div>
	);
}

Signup.propTypes = {
	setUserId: PropTypes.func.isRequired,
	setUser: PropTypes.func.isRequired
};