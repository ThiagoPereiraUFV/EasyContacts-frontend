//	Importing React main module and its features
import React, { useState } from "react";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Importing api to communicate to backend
import api from "../../../services/api";

//	Importing page styles
import "./styles.css";

//	Exporting resource to routes.js
export default function Signup() {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";
	
	//  Defining state variables
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordC, setPasswordC] = useState("");

	//	Defining history to jump through pages
	const history = useHistory();
	
	//	Function to handle user signup
	async function handleSignup(e) {
		e.preventDefault();

		try {
			const response = await api.post("user", { name, email, password, passwordC });
			
			sessionStorage.setItem("userId", response.data._id);

			history.push("/contacts");
		} catch(error) {
			alert(error.response.data);
		}
	}

	//	Testing if user is logged in
	if(!sessionStorage.getItem("userId")) {
		return (
			<div className="user-container">
				<div className="col-md-7 jumbotron py-3 m-auto">
					<h3>Abra sua conta:</h3>
					<hr/>
					<form onSubmit={handleSignup}>
						<div className="row my-1">
							<div className="col-md my-1">
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
							<div className="col-md my-1">
								<label>Email: </label>
								<input 
									type="email" 
									className="form-control" 
									name="email" 
									placeholder="email@provedor.com" 
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="row my-1">
							<div className="col-md my-1">
								<label>Senha: </label>
								<input 
									type="password" 
									className="form-control" 
									name="password" 
									placeholder="Senha" 
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<div className="col-md my-1">
								<label>Confirme a senha: </label>
								<input 
									type="password" 
									className="form-control" 
									name="passwordC" 
									placeholder="Confirmação da senha" 
									value={passwordC}
									onChange={(e) => setPasswordC(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="row my-1">
							<div className="col text-center">
								<small>Já tem conta? </small>
								<Link className="text-light" to="/user/login">
									<small>Clique aqui</small>
								</Link>
								<small> para entrar</small>
							</div>
						</div>
						<div className="row my-3">
							<div className="col text-center">
								<input 
									type="submit" 
									className="btn btn-info btn-lg signup" 
									value="Abrir conta"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	} else {
		alert("You must log out before creating a new account!");
		history.push("/");

		return null;
	}
}