//	Importing React main module and its features
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

//	Importing React Router features
import { Link } from "react-router-dom";

//	Importing query-string handle feature
import queryString from "query-string";

//	Importing React Bootstrap features
import { CardDeck, Card, Col, Row, Image, Button, Form, Modal, Container } from "react-bootstrap";

//	Importing components
import { Loading } from "../../components/Loading";
import { Push } from "../../components/Push";

//	Importing api to communicate to backend
import api from "../../services/api";

// Importing default avatar
import avatar from "../../assets/avatar.png";

//	Exporting resource to routes.js
export function Contacts({ userId, location }) {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";

	//  Contact state variables
	const [contacts, setContacts] = useState([]);
	const [contact, setContact] = useState(null);
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [annotations, setAnnotations] = useState("");
	const [imageName, setImageName] = useState("");
	const [image, setImage] = useState(null);

	//	Message state variables
	const [addContactModal, setAddContactModal] = useState(false);
	const [editContactModal, setEditContactModal] = useState(false);
	const [toastShow, setToastShow] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	//	Loading component state variable
	const [isLoading, setLoading] = useState(true);

	//	Query
	const searchQuery = queryString.parse(location.search).q;

	//	Loading user contacts
	useEffect(async () => {
		const queryContactsURL = (searchQuery && searchQuery.length) ?
			"/searchContact?q=" + searchQuery : "/contact";

		await api.get(queryContactsURL, {
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

		setLoading(false);
	}, [userId, searchQuery, editContactModal, addContactModal]);

	//	Load current contact data
	useEffect(() => {
		setName(contact?.name ?? "");
		setSurname(contact?.surname ?? "");
		setPhone(contact?.phone ?? "");
		setEmail(contact?.email ?? "");
		setAddress(contact?.address ?? "");
		setAnnotations(contact?.annotations ?? "");
		setImageName(contact?.image ?? "");
		setImage(null);
	}, [contact]);

	//	Contact image preview
	const preview = useMemo(() => {
		return image ? URL.createObjectURL(image) : null;
	}, [image]);

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
				setContact({});
				setAddContactModal(false);
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
				setContact({});
				setEditContactModal(false);
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

	async function handleUpdateContactImage(event) {
		event.preventDefault();

		const data = new FormData();

		data.append("image", image);

		await api.put("/contactImage/" + contact._id, data, {
			headers: {
				"X-Access-Token": userId
			}
		}).then((response) => {
			if(response && response.status === 200) {
				setTitle("Sucesso!");
				setMessage("Imagem atualizada com sucesso!");
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
	}

	async function handleDeleteContact(event) {
		event.preventDefault();

		await api.delete("/contact/" + contact._id, {
			headers: {
				"X-Access-Token": userId
			}
		}).then((response) => {
			if(response && response.status === 200) {
				setContact({});
				setEditContactModal(false);
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

	const contactFormBody = (
		<>
			<Row>
				<Form.Group as={Col} controlId="name" sm md="6" lg="6">
					<Form.Label>Nome</Form.Label>
					<Form.Control
						placeholder="Nome"
						type="text"
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="surname" sm md="6" lg="6">
					<Form.Label>Sobrenome</Form.Label>
					<Form.Control
						placeholder="Sobrenome"
						type="text"
						value={surname}
						onChange={e => setSurname(e.target.value)}
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="phone" md="12" lg="6">
					<Form.Label>Telefone</Form.Label>
					<Form.Control
						placeholder="Telefone"
						type="text"
						value={phone}
						onChange={e => setPhone(e.target.value)}
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="email" md="12" lg="6">
					<Form.Label>Email</Form.Label>
					<Form.Control
						placeholder="Email"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="address" md="12" lg="12">
					<Form.Label>Endereço</Form.Label>
					<Form.Control
						placeholder="Endereço"
						type="text"
						value={address}
						onChange={e => setAddress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="annotations" md="12" lg="12">
					<Form.Label>Anotações</Form.Label>
					<Form.Control
						value={annotations}
						onChange={e => setAnnotations(e.target.value)}
						placeholder="Anotações"
						as="textarea"
						rows="3"
						style={{ resize :"none" }}
					/>
				</Form.Group>
			</Row>
		</>
	);

	return (
		<Container fluid>
			<Row className="m-3 p-0">
				<Col sm="10">
					<h1 className="display-5">
						{searchQuery && searchQuery.length ?
							"Resultados para busca de \"" + searchQuery + "\""
							:
							"Meus contatos"
						}
					</h1>
				</Col>
				<Col className="text-center ml-auto" sm="auto">
					<Button variant="primary" onClick={() => setAddContactModal(true)}>
						Novo contato
					</Button>
				</Col>
			</Row>

			{isLoading ?
				<Loading animation="grow" />
				:
				<CardDeck className="mx-5">
					{contacts.length ?
						<Row>
							{contacts.map((contact) => (
								<Col key={contact._id} className="px-1 py-0" md="3" lg="2" xl="2">
									<Link
										className="text-light"
										to="#"
										onClick={() => { setContact(contact); setEditContactModal(true); }}
									>
										<Card className="bg-transparent m-0">
											<Image
												className="mx-auto"
												src={contact.image && contact.image.length ?
													process.env.REACT_APP_API_URL + "files/" + contact.image
													:
													avatar
												}
												alt="Avatar"
												fluid
											/>
											<Card.Body className="text-center">
												<h5>{contact.name} {contact.surname}</h5>
											</Card.Body>
										</Card>
									</Link>
								</Col>
							))}
						</Row>
						:
						<h4 className="text-light m-3">Nenhum contato registrado</h4>
					}
				</CardDeck>
			}

			<Modal
				className="p-0"
				show={addContactModal}
				onHide={() => { setAddContactModal(false); setContact({}); }}
				size="lg"
				centered
			>
				<Push.Bottom toastShow={toastShow} setToastShow={setToastShow} message={message} title={title} />
				<Modal.Header closeButton>
					<Modal.Title>Adicionar novo contato</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col className="text-center h-100 m-auto" sm="5">
							<Image
								alt="Avatar"
								src={avatar}
								fluid
								rounded
							/>
						</Col>
						<Col sm>
							<Form onSubmit={handleAddContact}>
								{contactFormBody}
							</Form>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => { setAddContactModal(false); setContact({}); }}>
						Voltar
					</Button>
					<Button variant="primary" onClick={(e) => { handleAddContact(e); }}>
						Adicionar
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				className="p-0"
				show={editContactModal}
				onHide={() => { setEditContactModal(false); setContact({}); }}
				size="lg"
				centered
			>
				<Push.Bottom toastShow={toastShow} setToastShow={setToastShow} message={message} title={title} />
				<Modal.Header closeButton>
					<Modal.Title>Modificar contato</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col className="d-flex text-center flex-column m-auto" sm="5">
							<Form onSubmit={handleUpdateContactImage}>
								<Form.Control
									id="inputImage"
									className="d-none"
									type="file"
									accept="image/*"
									onChange={event => setImage(event.target.files[0])}
									required
								/>
								<Image
									className={preview ? "btn border-0 m-auto" : "btn w-75 m-auto"}
									src={preview ?
										preview
										:
										(imageName && imageName.length ?
											process.env.REACT_APP_API_URL + "files/" + imageName
											:
											avatar
										)
									}
									alt="Selecione sua imagem"
									onClick={() => document.getElementById("inputImage").click()}
									rounded
									fluid
								/>
								{image ?
									<Button variant="primary" type="submit" className="d-flex mx-auto my-2">
										Alterar imagem
									</Button>
									:
									<Button variant="primary" type="submit" className="d-flex mx-auto my-2">
										Adicionar imagem
									</Button>
								}
							</Form>
						</Col>
						<Col sm>
							<Form onSubmit={handleUpdateContact}>
								{contactFormBody}
							</Form>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => { setEditContactModal(false); setContact({}); }}>
						Voltar
					</Button>
					<Button variant="danger" onClick={handleDeleteContact}>
						Apagar
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
	userId: PropTypes.string.isRequired,
	location: PropTypes.object.isRequired
};