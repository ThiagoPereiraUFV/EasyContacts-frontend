//	Importing React main module and its features
import React, { useState } from "react";
import PropTypes from "prop-types";

//	Importing React Router features
import { useHistory } from "react-router-dom";

//	Importing React Bootstrap features
import { Modal, Jumbotron, Form, Button, Col, Row } from "react-bootstrap";

//	Importing components
import { Push } from "../../components/Push";

//	Importing api to communicate to backend
import api from "../../services/api";

//	Exporting resource to routes.js
export function User({ userId, setUserId, user, setUser }) {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";

	//  Defining state variables
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [passwordO, setPasswordO] = useState("");
	const [passwordN, setPasswordN] = useState("");
	const [passwordOnDelete, setPasswordOnDelete] = useState("");

	//	Message settings
	const [toastShow, setToastShow] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	//	Defining history to jump through pages
	const history = useHistory();

	// Function to handle user information modifications
	async function handleUserUpdate(event) {
		event.preventDefault();

		const data = {
			name,
			email,
			passwordO,
			passwordN
		};

		await api.put("/user", data , {
			headers: {
				"X-Access-Token": userId
			}
		}).then((response) => {
			if(response && response.status) {
				setTitle("Alterações usuário");
				setMessage("Alterações feitas com sucesso!");
				setToastShow(true);
			}
		}).catch((error) => {
			setTitle("Erro!");
			if(error.response && [400, 401, 403, 404].includes(error.response.status)) {
				const messages = error.response.data;
				setMessage(messages.errors ? messages.errors.join(", ") : messages);
			} else if(error.response && error.response.status === 500) {
				setMessage(error.message);
			}
			setToastShow(true);
		});

		setPasswordO("");
		setPasswordN("");
	}

	// Function to handle user information deleting
	async function handleUserDelete(event) {
		event.preventDefault();

		await api.delete("/user", {
			headers: {
				"X-Access-Token": userId,
				password: passwordOnDelete
			}
		}).then((response) => {
			if(response && response.status === 200) {
				sessionStorage.removeItem("userId");

				setUserId(sessionStorage.getItem("userId"));
				setUser(null);

				setModalShow(false);
				history.push("/");
			}
		}).catch((error) => {
			setTitle("Erro!");
			if(error.response && [400, 401, 403, 404].includes(error.response.status)) {
				const messages = error.response.data;
				setMessage(messages.errors ? messages.errors.join(", ") : messages);
			} else if(error.response && error.response.status === 500) {
				setMessage(error.message);
			}
			setToastShow(true);
		});

		setPasswordOnDelete("");
	}

	return (
		<div className="user-container d-flex justify-content-center align-items-center h-100">
			<Push.Bottom toastShow={toastShow} setToastShow={setToastShow} message={message} title={title} />
			<Jumbotron className="col-md-7 py-4 m-3">
				<h3>Configurações:</h3>
				<Form className="py-2 d-flex flex-column h-100" onSubmit={handleUserUpdate}>
					<Row className="d-flex justify-content-between">
						<Col sm>
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
							<Form.Group controlId="passwordO">
								<Form.Label>Senha antiga</Form.Label>
								<Form.Control
									placeholder="Senha antiga"
									type="password"
									value={passwordO}
									onChange={event => setPasswordO(event.target.value)}
								/>
							</Form.Group>
						</Col>
						<Col sm>
							<Form.Group controlId="passwordN">
								<Form.Label>Nova Senha</Form.Label>
								<Form.Control
									placeholder="Nova senha"
									type="password"
									value={passwordN}
									onChange={event => setPasswordN(event.target.value)}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="my-3">
						<Col className="text-center">
							<Button variant="primary" type="submit">
								Salvar alterações
							</Button>
						</Col>
					</Row>
				</Form>
				<hr/>
				<Row className="d-flex">
					<Button className="m-auto" variant="danger" onClick={() => setModalShow(true)}>
						Encerrar conta
					</Button>
				</Row>
			</Jumbotron>

			<Modal show={modalShow} onHide={() => setModalShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Aviso</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Você está prestes a encerrar sua conta!
					<Form className="my-3" onSubmit={(e) => { handleUserDelete(e); setModalShow(false); }}>
						<Form.Group controlId="passwordOnDelete">
							<Form.Label>Confirme sua senha</Form.Label>
							<Form.Control
								placeholder="Senha"
								type="password"
								value={passwordOnDelete}
								onChange={event => setPasswordOnDelete(event.target.value)}
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setModalShow(false)}>
						Voltar
					</Button>
					<Button variant="danger" onClick={(e) => { handleUserDelete(e); setModalShow(false); }}>
						Encerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

User.propTypes = {
	userId: PropTypes.string.isRequired,
	setUserId: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired
};