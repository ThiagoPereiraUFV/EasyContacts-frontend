//	Importing React main module and its features
import React, { useState } from "react";

//	Importing React Router features
import { Link, useHistory } from "react-router-dom";

//	Importing api to communicate to backend
import api from "../../../services/api";

//	Importing page styles
import "./styles.css";

//	Exporting resource to routes.js
export default function Login() {
	//	Setting background style properties
	document.getElementsByTagName("body")[0].style = "backdrop-filter: blur(4px)";
	
	//  Defining state variables
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	//	Defining history to jump through pages
	const history = useHistory();

	//	Function to handle user login
	async function handleLogin(e) {
		e.preventDefault();

		try {
			const response = await api.post("session", { email, password });

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
				<div className="col-md-3 jumbotron m-2 py-3">
					<h3>Acesse sua conta:</h3>
					<hr/>
					<form onSubmit={handleLogin}>
						<div className="row my-1">
							<div className="col my-1">
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
							<div className="col my-1">
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
						</div>
						<div className="row my-1">
							<div className="col text-center">
								<small>Não tem conta? </small>
								<Link className="text-light" to="/user/signup">
									<small>Clique aqui</small>
								</Link>
								<small> para se cadastrar</small>
							</div>
						</div>
						<div className="row my-3">
							<div className="col text-center">
								<input 
									type="submit" 
									className="btn btn-info btn-lg" 
									value="Acessar"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	} else {
		alert("You are already logged in!");
		history.push("/");

		return null;
	}
}