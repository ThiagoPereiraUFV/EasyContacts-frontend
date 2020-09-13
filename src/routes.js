//	Importing React main module
import React, { useState, useEffect } from "react";

//	Importing Route features to manage app routes
import { BrowserRouter, Route, Switch } from "react-router-dom";

//	Importing all app pages
import HomePage from "./pages/Website/Home";
import NotFoundPage from "./pages/Website/NotFound";
import Navbar from "./pages/Website/Navbar";
import Loading from "./pages/Website/Loading";
import User from "./pages/User";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/Contacts/Add";
import EditContact from "./pages/Contacts/Edit";
import SearchContact from "./pages/Contacts/Search";

//	Importing api to communicate to backend
import api from "./services/api";

//	Exporting Routes do App.js
export default function Routes() {
	//	User and session variables
	const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
	const [user, setUser] = useState({});

	//	Loading variable
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			if(userId && userId.length) {
				await api.get("user", {
					headers: {
						authorization: userId
					}
				}).then((response) => {
					if(response && response.data) {
						setUser(response.data);
						setUserId(response.data._id);
					}
				}).catch(() => {});
			}

			setLoading(false);
		}

		fetchData();
	}, [userId]);

	if(isLoading) {
		return (<Loading />);
	}

	return (
		<BrowserRouter>
			<Navbar userId={userId} setUserId={setUserId} setUser={setUser} />
			<Switch>
				<Route exact path="/" render={() => <HomePage userId={userId} />} />
				<Route exact path="/user" component={User} />
				<Route exact path="/user/login" component={Login} />
				<Route exact path="/user/signup" component={Signup} />
				<Route exact path="/contacts" component={Contacts} />
				<Route exact path="/contacts/add" component={AddContact} />
				<Route path="/contacts/edit/:id" component={EditContact} />
				<Route path="/contacts/search" component={SearchContact} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</BrowserRouter>
	);
}