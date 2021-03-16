//	Importing React main module
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//	Importing Route features to manage app routes
import { BrowserRouter, Route, Switch } from "react-router-dom";

//	Importing all app pages
import { HomePage } from "./pages/Website/Home";
import { NotFoundPage } from "./pages/Website/NotFound";
import { User } from "./pages/User";
import { Login } from "./pages/User/Login";
import { Signup } from "./pages/User/Signup";
import { Contacts } from "./pages/Contacts";
import { SearchContact } from "./pages/Contacts/Search";

//	Importing components
import { WebNavbar } from "./components/Navbar";
import { Loading } from "./components/Loading";
import { Logged } from "./components/Authentication/Logged";
import { Auth } from "./components/Authentication";

//	Importing api to communicate to backend
import api from "./services/api";

//	Exporting Routes do App.js
export function Routes() {
	//	User and session state variables
	const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
	const [user, setUser] = useState(null);

	//	Loading component state variable
	const [isLoading, setLoading] = useState(true);

	useEffect(async () => {
		if(userId && userId.length) {
			await api.get("/session", {
				headers: {
					"X-Access-Token": userId
				}
			}).then((response) => {
				if(response && response.status === 200) {
					setUser(response.data);
				}
			}).catch(() => {
				setUserId("");
				setUser(null);
				sessionStorage.removeItem("userId");
			});
		}

		setLoading(false);
	}, [userId]);

	const userAuth = user && user._id && userId && userId.length;

	if(isLoading) {
		return (<Loading />);
	}

	return (
		<BrowserRouter>
			<WebNavbar userId={userId} setUserId={setUserId} setUser={setUser} />
			<Switch>
				<Route exact path="/" render={() => <HomePage userId={userId} />} />
				<Route exact path="/user"
					render={() => userAuth ?
						<User userId={userId} setUserId={setUserId} user={user} setUser={setUser} />
						:
						<Auth />
					}
				/>
				<Route
					exact path="/login"
					render={() => !userAuth ? <Login setUserId={setUserId} setUser={setUser} /> : <Logged />}
				/>
				<Route
					exact path="/signup"
					render={() => !userAuth ? <Signup setUserId={setUserId} setUser={setUser} /> : <Logged />}
				/>
				<Route
					exact path="/contacts"
					render={() => userAuth ? <Contacts userId={userId} /> : <Auth />}
				/>
				<Route path="/contacts/search"
					render={(props) => userAuth ?
						<SearchContact userId={userId} location={props.location} />
						:
						<Auth />
					}
				/>
				<Route path="*" component={NotFoundPage} status={404} />
			</Switch>
		</BrowserRouter>
	);
}

Routes.propTypes = {
	location: PropTypes.object
};