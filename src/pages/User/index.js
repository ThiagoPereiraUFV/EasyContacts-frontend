//	Importing React main module and its features
import React, { useState, useEffect } from "react";

//	Importing React Router features
import { useHistory } from "react-router-dom";

//	Importing api to communicate to backend
import api from "../../services/api";

//	Importing page styles
import "./styles.css";

//	Exporting resource to routes.js
export default function User() {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";
	
	//  Defining state variables
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [passwordO, setPasswordO] = useState("");
	const [passwordN, setPasswordN] = useState("");
	
	//	Defining history to jump through pages
	const history = useHistory();

	//	Loading current user informations
	useEffect(() => {
		api.get("session", {
			headers: {
				Authorization: sessionStorage.getItem("userId")
			}
		}).then((response) => {
			setName(response.data.name);
			setEmail(response.data.email);
		}).catch((error) => {
			alert(error.response.data);
			history.push("/");
		});
	}, [history]);

	// Function to handle user information modifications
	async function editUser(e) {
		e.preventDefault();

		try {
			const response = await api.put("user", { name, email, passwordO, passwordN } , {
				headers: {
					Authorization: sessionStorage.getItem("userId")
				}
			});

			alert(response.data);

			history.go();
		} catch(error) {
			alert(error.response.data);
		}
	}

	// Function to handle user information deleting
	async function deleteUser(e) {
		e.preventDefault();

		try {
			const response = await api.delete("user", {
				headers: {
					Authorization: sessionStorage.getItem("userId")
				}
			});

			sessionStorage.removeItem("userId");

			history.push("/");
			history.go();

			alert(response.data);
		} catch(error) {
			alert(error.response.data);
		}
	}

	//	Testing if user is logged in
	if(sessionStorage.getItem("userId")) {
		return (
			<div className="user-container">
				<div className="jumbotron py-4 m-0 w-75">
					<h3>Configurações:</h3>
					<hr/>
					<div id="accordion">
						<div className="jumbotron p-0 m-2 w-100">
							<div className="card-header" id="headingOne">
								<h5 className="mb-0">
									<button className="btn btn-outline-light btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
										<b>Alterar Dados do Usuário</b>
									</button>
								</h5>
							</div>
							<div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
								<form className="card-body" onSubmit={editUser}>
									<div className="row my-1">
										<div className="col-md">
											<label>Nome: </label>
											<input 
												type="text" 
												className="form-control" 
												id="name" 
												name="name" 
												placeholder="Nome"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div className="col-md">
											<label>Email: </label>
											<input 
												type="email" 
												className="form-control" 
												id="email" 
												name="email" 
												placeholder="email@provedor.com"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
									</div>
									<div className="row my-1">
										<div className="col-md">
											<label>Senha antiga: </label>
											<input 
												type="password" 
												className="form-control" 
												name="passwordO" 
												placeholder="Senha antiga"
												value={passwordO}
												onChange={(e) => setPasswordO(e.target.value)}
											/>
										</div>
										<div className="col-md">
											<label>Nova senha: </label>
											<input 
												type="password" 
												className="form-control" 
												id="password" 
												name="passwordN" 
												placeholder="Nova senha"
												value={passwordN}
												onChange={(e) => setPasswordN(e.target.value)}
											/>
											<br/>
										</div>
									</div>
									<div className="row my-1">
										<div className="col-md text-center">
											<input 
												id="submitButton" 
												type="submit" 
												className="btn btn-primary btn-md" 
												value="Salvar alterações"
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="jumbotron p-0 m-2 w-100">
							<div className="card-header" id="headingTwo">
								<h5 className="mb-0">
									<button className="btn btn-outline-warning btn-block" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
										<b>Área de risco</b>
									</button>
								</h5>
							</div>
							<div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
								<div className="card-body">
									<div className="col-md text-center p-0">
										<button type="button" className="btn btn-danger m-2" data-toggle="modal" data-target="#closeAccountModal">
											Encerrar conta
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="modal fade" id="closeAccountModal" tabIndex="-1" role="dialog" aria-labelledby="closeAccountModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="closeAccountModalLabel">Alerta</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								Todas as suas informações serão perdidas, você realmente deseja encerrar sua conta?
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal">
									Cancelar
								</button>
								<button type="button" className="btn btn-danger" onClick={deleteUser}>
									Fechar Conta
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		alert("You must log in before accessing this page!");
		history.push("/user/login");

		return null;
	}
}