//	Importing React main module and its features
import React, { useState } from "react";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Importing React Bootstrap features
import { Toast, Jumbotron, Col, Row, Image, Button, Card, Accordion, Form } from "react-bootstrap";

//	Importing api to communicate to backend
import api from "../../../services/api";

// Importing default avatar
import avatar from "../../../assets/avatar.png";

//	Exporting resource to routes.js
export default function Add() {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";

	//  Defining state variables
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [annotations, setAnnotations] = useState("");
	const imageName = "";

	//	Message settings
	const [toastShow, setToastShow] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	//	Defining history to jump through pages
	const history = useHistory();

	// Function to handle contact adding
	async function handleAddContact(event) {
		event.preventDefault();

		await api.post("contacts", {
			name,
			surname,
			phone,
			email,
			address,
			annotations,
			imageName
		}, {
			headers: {
				Authorization: sessionStorage.getItem("userId")
			}
		}).then(() => {
			history.push("/contacts");
		}).catch((error) => {
			setTitle("Erro!");
			setMessage(error.response ? error.response.data : error.message);
			setToastShow(true);
		});
	}

	const toast = (
		<div
			aria-live="polite"
			aria-atomic="true"
			style={{
				position: "fixed",
				top: "7%",
				right: "2%",
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
		<div className="contact-container d-flex h-100">
			{toast}
			<Jumbotron className="col-sm-7 p-4 m-auto">
				<h3>Novo contato:</h3>
				<Form onSubmit={handleAddContact}>
					<Row>
						<Col className="text-center" sm>
							<Image
								id="avatar"
								alt="Avatar"
								src={avatar}
								fluid
								rounded
							/>
						</Col>
						<Col className="d-flex flex-column justify-content-between" sm>
							<Row>
								<Col>
									<Form.Group controlId="name">
										<Form.Label>Nome</Form.Label>
										<Form.Control
											placeholder="Nome"
											type="text"
											value={name}
											onChange={e => setName(e.target.value)}
											required
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group controlId="surname">
										<Form.Label>Sobrenome</Form.Label>
										<Form.Control
											placeholder="Sobrenome"
											type="text"
											value={surname}
											onChange={e => setSurname(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group controlId="phone">
										<Form.Label>Telefone</Form.Label>
										<Form.Control
											placeholder="Telefone"
											type="text"
											value={phone}
											onChange={e => setPhone(e.target.value)}
										/>
									</Form.Group>
								</Col>
							</Row>
						</Col>
					</Row>
					<Jumbotron className="p-0">
						<Accordion className="w-100">
							<Card className="w-100" bg="transparent">
								<Card.Header className="text-center w-100">
									<Accordion.Toggle as={Button} variant="outline-light" eventKey="0">
										Adicionar mais informações
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<Row className="row">
											<Col sm>
												<Row>
													<Col>
														<Form.Group controlId="email">
															<Form.Label>Email</Form.Label>
															<Form.Control
																placeholder="Email"
																type="email"
																value={email}
																onChange={e => setEmail(e.target.value)}
															/>
														</Form.Group>
													</Col>
												</Row>
												<Row>
													<Col>
														<Form.Group controlId="address">
															<Form.Label>Endereço</Form.Label>
															<Form.Control
																placeholder="Endereço"
																type="text"
																value={address}
																onChange={e => setAddress(e.target.value)}
															/>
														</Form.Group>
													</Col>
												</Row>
											</Col>
											<Col sm>
												<Form.Control
													value={annotations}
													onChange={e => setAnnotations(e.target.value)}
													placeholder="Anotações"
													as="textarea"
													rows="6"
													style={{ resize :"none" }}
												/>
											</Col>
										</Row>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					</Jumbotron>
					<Row className="justify-content-end m-0">
						<Button
							type="submit"
							variant="success"
						>
							Cadastrar
						</Button>
						<Link className="btn btn-secondary mx-3" to="/contacts">
							Cancelar
						</Link>
					</Row>
				</Form>
			</Jumbotron>
		</div>
	);
}