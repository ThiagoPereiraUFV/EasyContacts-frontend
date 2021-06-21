//	Importing React main module
import React from "react";

//	Importing ReactDOM feature to render app on HTML
import ReactDOM from "react-dom";

//	Importing App to render
import App from "./App";

//	Rendering app
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
