//	Importing React main module and its features
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Importing React Bootstrap features
import { Modal, CardDeck, Card, Col, Row, Image, Button, Form, Container } from "react-bootstrap";

//	Importing components
import { Push } from "../../components/Push";
import { Loading } from "../../components/Loading";

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

		setLoading(false);
	}, [userId]);

	//	Load current contact data
	useEffect(() => {
		setName(contact.name ? contact.name : "");
		setSurname(contact.surname ? contact.surname : "");
		setPhone(contact.phone ? contact.phone : "");
		setEmail(contact.email ? contact.email : "");
		setAddress(contact.address ? contact.address : "");
		setAnnotations(contact.annotations ? contact.annotations : "");
		setImageName(contact.image ? contact.image : "");
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
				<Col sm>
					<h1 className="display-5">Meus contatos</h1>
				</Col>
				<Col sm className="text-right">
					<Button variant="primary" onClick={() => setAddContactModal(true)}>
						Novo contato
					</Button>
				</Col>
			</Row>

			{isLoading ?
				<Loading animation="grow" />
				:
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
										className="mx-auto"
										src={contact.image && contact.image.length ?
											process.env.REACT_APP_API_URL + "files/" + contact.image
											:
											avatar
										}
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
			}

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
					<Button variant="secondary" onClick={() => setAddContactModal(false)}>
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
				onHide={() => setEditContactModal(false)}
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
					<Button variant="secondary" onClick={() => setEditContactModal(false)}>
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
	userId: PropTypes.string.isRequired
};