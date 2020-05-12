//	Importing React main module and its features
import React, { useState } from "react";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Importing api to communicate to backend
import api from "../../../services/api";

//	Importing page styles
import "./styles.css";

//	Exporting resource to routes.js
export default function Add() {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";
	
	//  Defining state variables
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [telephone, setTelephone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [annotations, setAnnotations] = useState("");
	const imageName = "";
	
	//	Defining history to jump through pages
	const history = useHistory();

	// Function to handle contact adding
	async function handleAddContact(e) {
		e.preventDefault();

		try {
			const response = await api.post("contacts", { 
				name, 
				surname, 
				telephone, 
				email, 
				address, 
				annotations, 
				imageName 
			}, {
				headers: {
					Authorization: sessionStorage.getItem("userId")
				}
			});

			history.push("/contacts");
			
			alert(response.data);
		} catch(error) {
			alert(error.response.data);
		}
	}

	//	Testing if user is logged in
	if(sessionStorage.getItem("userId")) {
		return (
			<div className="contact-container">
				<div className="col-md-7 jumbotron p-4 m-auto">
					<h3>Novo contato:</h3>
					<form onSubmit={handleAddContact}>
						<div className="row my-1">
							<div className="col-md text-center">
								<img 
									className="img-thumbnail rounded" 
									id="avatar" 
									alt="Avatar" 
									src="/avatar.png"
								/>
							</div>
							<div className="col-md d-flex flex-column justify-content-between">
								<div className="row mb-1">
									<div className="col">
										<label>Nome: </label>
										<input 
											type="text" 
											className="form-control" 
											name="name" 
											placeholder="Nome" 
											value={name}
											onChange={(e) => setName(e.target.value)}
											required
										/>
									</div>
								</div>
								<div className="row my-1">
									<div className="col">
										<label>Sobrenome: </label>
										<input 
											type="text" 
											className="form-control" 
											name="surname" 
											placeholder="Sobrenome"
											value={surname}
											onChange={(e) => setSurname(e.target.value)}
										/>
									</div>
								</div>
								<div className="row mt-1">
									<div className="col">
										<label>Telefone: </label>
										<input 
											type="tel" 
											className="form-control" 
											name="telephone" 
											pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$" 
											placeholder="(DDD) 9xxxx-xxxx"
											value={telephone}
											onChange={(e) => setTelephone(e.target.value)}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="row my-1" id="accordion">
							<div className="jumbotron p-0 my-2 w-100">
								<div className="card-header" id="headingOne">
									<h5 className="mb-0">
										<button type="button" className="btn btn-outline-light btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
											Adicionar mais informações
										</button>
									</h5>
								</div>
								<div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
									<div className="card-body m-0 p-4">
										<div className="row">
											<div className="col-md d-flex flex-column justify-content-between">
												<div className="row my-1">
													<div className="col">
														<label>Email: </label>
														<input 
															type="email" 
															className="form-control" 
															name="email" 
															placeholder="Email"
															value={email}
															onChange={(e) => setEmail(e.target.value)}
														/>
													</div>
												</div>
												<div className="row my-1">
													<div className="col">
														<label>Endereço: </label>
														<input 
															type="text" 
															className="form-control" 
															name="address" 
															placeholder="Endereço"
															value={address}
															onChange={(e) => setAddress(e.target.value)}
														/>
													</div>
												</div>
											</div>
											<div className="col-md">
												<label>Anotações: </label>
												<textarea 
													className="form-control" 
													name="annotations" 
													style={{ resize: "none" }}
													maxLength="200" 
													cols="15" 
													rows="4"
													value={annotations}
													onChange={(e) => setAnnotations(e.target.value)}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row justify-content-end m-0">
							<input 
								type="submit" 
								className="btn btn-success mx-3" 
								id="submitButton" 
								value="Cadastrar"
							/>
							<Link className="btn btn-secondary mx-3" to="/contacts">
								Cancelar
							</Link>
						</div>
					</form>
				</div>
			</div>
		);
	} else {
		alert("You must log in before accessing this page!");
		history.push("/user/login");

		return null;
	}
}