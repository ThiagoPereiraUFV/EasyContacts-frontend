//	Importing React main module and its features
import React from "react";
import PropTypes from "prop-types";

//	Importing React Bootstrap features
import { Container, Spinner } from "react-bootstrap";

//	Exporting resource to routes.js
export function Loading({ animation }) {
	return (
		<Container className="d-flex h-100" fluid>
			<Spinner
				className="m-auto"
				style={{ width: "8rem", height: "8rem" }}
				animation={animation ? animation : "border"}
				variant="primary"
			/>
		</Container>
	);
}

Loading.propTypes = {
	animation: PropTypes.string
};
