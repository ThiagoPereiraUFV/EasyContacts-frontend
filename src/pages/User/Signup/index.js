//	Importing React main module and its features
import React, { useState } from "react";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Importing React Bootstrap features
import { Toast, Jumbotron, Form, Button, Col, Row } from "react-bootstrap";

//	Importing api to communicate to backend
import api from "../../../services/api";

//	Exporting resource to routes.js
export default function Signup({ setUserId, setUser }) {
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

		const data = new FormData();

		data.append("name", name);
		data.append("email", email);
		data.append("password", password);
		data.append("passwordC", passwordC);

		await api.post("/user", data)
			.then((response) => {
				sessionStorage.setItem("userId", response.data._id);

				setUserId(sessionStorage.getItem("userId"));
				setUser(response.data);

				history.push("/menu");
			})
			.catch((error) => {
				setTitle("Erro!");
				if(error.response) {
					setMessage(error.response.data);
				} else {
					setMessage(error.message);
				}
				setToastShow(true); // deu erro de objeto
			});
	}

	const toast = (
		<div
			aria-live="polite"
			aria-atomic="true"
			style={{
				position: "fixed",
				top: "3%",
				right: "3%",
				zIndex: 5
			}}
		>
			<Toast show={toastShow} onClose={() => setToastShow(false)} delay={3000} autohide>
				<Toast.Header>
					<strong className="mr-auto">{title}</strong>
				</Toast.Header>
				<Toast.Body>{message}</Toast.Body>
			</Toast>
		</div>
	);

	return (
		<div className="user-container d-flex h-100">
			{toast}
			<Jumbotron className="col-md-7 py-3 m-auto">
				<h3>Abra sua conta:</h3>
				<Form className="py-2 d-flex flex-column flex-wrap h-100" onSubmit={handleSignup}>
					<Row className="d-flex justify-content-between">
						<Col>
							<Form.Group controlId="name">
								<Form.Label>Nome</Form.Label>
								<Form.Control
									placeholder="Seu nome"
									type="text"
									value={name}
									onChange={event => setName(event.target.value)}
									required
								/>
							</Form.Group>
						</Col>
						<Col>
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
						<Col>
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
						<Col>
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