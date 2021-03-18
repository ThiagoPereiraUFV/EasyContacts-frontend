//	Importing React main module and its features
import React from "react";
import PropTypes from "prop-types";

//	Importing React Bootstrap features
import { Modal, Card, Row, Col, Image, Form, Button } from "react-bootstrap";

//	Importing components
import { Push } from "../Push";

// Importing default avatar
import avatar from "../../assets/avatar.png";

export const Contact = {
	CCard: function CCard({ contact }) {
		return (
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
				<Card.Body>
					<Card.Title className="d-flex flex-column align-items-center p-2 h-100">
						<h5>{contact.name} {contact.surname}</h5>
					</Card.Title>
				</Card.Body>
			</Card>
		);
	},
	ModalAdd: function ModalAdd({
		contactFormBody,
		handleAddContact,
		addContactModal,
		setAddContactModal,
		toastShow,
		setToastShow,
		message,
		title
	}) {
		return (
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
		);
	},
	ModalEdit: function ModalEdit({
		preview,
		image,
		setImage,
		imageName,
		contactFormBody,
		editContactModal,
		setEditContactModal,
		handleUpdateContact,
		handleDeleteContact,
		handleUpdateContactImage,
		toastShow,
		setToastShow,
		message,
		title
	}) {
		return (
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
		);
	}
};

Contact.CCard.propTypes = {
	contact: PropTypes.object.isRequired
};

Contact.ModalAdd.propTypes = {
	contactFormBody: PropTypes.any.isRequired,
	handleAddContact: PropTypes.func.isRequired,
	addContactModal: PropTypes.bool.isRequired,
	setAddContactModal: PropTypes.func.isRequired,
	toastShow: PropTypes.bool.isRequired,
	setToastShow: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

Contact.ModalEdit.propTypes = {
	preview: PropTypes.any.isRequired,
	image: PropTypes.any.isRequired,
	setImage: PropTypes.func.isRequired,
	imageName: PropTypes.string.isRequired,
	contactFormBody: PropTypes.any.isRequired,
	editContactModal: PropTypes.bool.isRequired,
	setEditContactModal: PropTypes.func.isRequired,
	handleUpdateContact: PropTypes.func.isRequired,
	handleDeleteContact: PropTypes.func.isRequired,
	handleUpdateContactImage: PropTypes.func.isRequired,
	toastShow: PropTypes.bool.isRequired,
	setToastShow: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};