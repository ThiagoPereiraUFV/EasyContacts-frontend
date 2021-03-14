//	Importing React main module and its features
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Importing React Bootstrap features
import { Modal, CardDeck, Card, Col, Row, Image, Button, Accordion, Form, Container } from "react-bootstrap";

//	Importing components
import { Push } from "../../components/Push";

//	Importing api to communicate to backend
import api from "../../services/api";

// Importing default avatar
import avatar from "../../assets/avatar.png";

//	Exporting resource to routes.js
export function Contacts({ userId }) {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";

	//  Contact state variables
	const [contacts, setContacts] = useState([]);
	const [contact, setContact] = useState({});
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [annotations, setAnnotations] = useState("");
	//const [image, setImage] = useState("");

	//	Message state variables
	const [addContactModal, setAddContactModal] = useState(false);
	const [editContactModal, setEditContactModal] = useState(false);
	const [toastShow, setToastShow] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	//	Defining history to jump through pages
	const history = useHistory();

	//	Loading user contacts
	useEffect(async () => {
		await api.get("/contact", {
			headers: {
				"X-Access-Token": userId
			}
		}).then((response) => {
			if(response && response.status === 200) {
				setContacts(response.data);
			}
		}).catch(() => {
			setContacts([]);
		});
	}, [userId]);

	//	Load current contact data
	useEffect(() => {
		setName(contact.name ? contact.name : "");
		setSurname(contact.surname ? contact.surname : "");
		setPhone(contact.phone ? contact.phone : "");
		setEmail(contact.email ? contact.email : "");
		setAddress(contact.address ? contact.address : "");
		setAnnotations(contact.annotations ? contact.annotations : "");
		//setImage(contact.image ? contact.image : "");
	}, [contact]);

	async function handleAddContact(event) {
		event.preventDefault();

		const data = {
			name,
			surname,
			phone,
			email,
			address,
			annotations
		};

		await api.post("/contact", data, {
			headers: {
				"X-Access-Token": userId
			}
		}).then((response) => {
			if(response && response.status === 201) {
				history.go();
			}
		}).catch((error) => {
			setTitle("Erro!");
			if(error.response && [400, 401, 403].includes(error.response.status)) {
				const messages = error.response.data;
				setMessage(messages.errors ? messages.errors.join(", ") : messages);
			} else if(error.response && error.response.status === 500) {
				setMessage(error.message);
			}
			setToastShow(true);
		});
	}

	async function handleUpdateContact(event) {
		event.preventDefault();

		const data = {
			name,
			surname,
			phone,
			email,
			address,
			annotations
		};

		await api.put("/contact/" + contact._id, data, {
			headers: {
				"X-Access-Token": userId
			}
		}).then((response) => {
			if(response && response.status === 200) {
				history.go();
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
	}
	/*
	async function handleUpdateContactImage(event) {
		event.preventDefault();

		const data = {
			name,
			surname,
			phone,
			email,
			address,
			annotations
		};

		await api.put("/contacts/" + contact._id, data, {
			headers: {
				"X-Access-Token": userId
			}
		}).then((response) => {
			if(response && response.status === 200) {
				setContact({});
				history.go();
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
	}
	*/
	async function handleDeleteContact(event) {
		event.preventDefault();

		await api.delete("/contact/" + contact._id, {
			headers: {
				"X-Access-Token": userId
			}
		}).then((response) => {
			if(response && response.status === 200) {
				history.go();
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
	}

	return (
		<Container fluid>
			<Row className="m-3 p-0">
				<Col sm>
					<h1 className="display-5">Meus contatos</h1>
				</Col>
				<Col sm className="text-right">
					<Button variant="primary" onClick={() => setAddContactModal(true)}>
						Novo contato
					</Button>
				</Col>
			</Row>

			<CardDeck className="m-3">
				{contacts.length ?
					contacts.map((contact) => (
						<Link
							key={contact._id}
							className="col-sm-2 text-light m-0 p-0"
							to="#"
							onClick={() => { setContact(contact); setEditContactModal(true); }}
						>
							<Card className="bg-transparent m-0">
								<Image
									className="mx-auto" src={avatar}
									alt="Avatar"
									style={{ filter: "saturate(9.9)" }}
									fluid
								/>
								<Card.Body>
									<Card.Title className="d-flex flex-column align-items-center p-2 h-100">
										<h5>{contact.name} {contact.surname}</h5>
									</Card.Title>
								</Card.Body>
							</Card>
						</Link>
					))
					:
					<h4 className="text-light m-3">Nenhum contato registrado</h4>
				}
			</CardDeck>

			<Modal
				className="p-0"
				show={addContactModal}
				onHide={() => setAddContactModal(false)}
				size="lg"
				centered
			>
				<Push.Bottom toastShow={toastShow} setToastShow={setToastShow} message={message} title={title} />
				<Modal.Header closeButton>
					<Modal.Title>Adicionar novo contato</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
						<Accordion>
							<Card bg="light">
								<Card.Header className="text-center">
									<Accordion.Toggle as={Button} variant="light" eventKey="0">
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
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setAddContactModal(false)}>
						Voltar
					</Button>
					<Button variant="primary" onClick={(e) => { handleAddContact(e); }}>
						Adicionar contato
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				className="p-0"
				show={editContactModal}
				onHide={() => setEditContactModal(false)}
				size="lg"
				centered
			>
				<Push.Bottom toastShow={toastShow} setToastShow={setToastShow} message={message} title={title} />
				<Modal.Header closeButton>
					<Modal.Title>Modificar contato</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleUpdateContact}>
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
						<Accordion>
							<Card bg="light">
								<Card.Header className="text-center">
									<Accordion.Toggle as={Button} variant="light" eventKey="0">
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
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setEditContactModal(false)}>
						Voltar
					</Button>
					<Button variant="danger" onClick={handleDeleteContact}>
						Apagar contato
					</Button>
					<Button variant="primary" onClick={(e) => { handleUpdateContact(e); }}>
						Salvar alterações
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

Contacts.propTypes = {
	userId: PropTypes.string.isRequired
};