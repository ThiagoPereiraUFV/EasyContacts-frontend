//	Importing React main module and its features
import React from "react";
import PropTypes from "prop-types";

//	Importing React Bootstrap features
import { Toast } from "react-bootstrap";

export const Push = {
	Top: function Top({ toastShow, setToastShow, message, title }) {
		return (
			<div
				aria-live="polite"
				aria-atomic="true"
				style={{
					position: "fixed",
					top: "7%",
					right: "2%",
					zIndex: 5
				}}
			>
				<Toast show={toastShow} onClose={() => setToastShow(false)} delay={3000} autohide>
					<Toast.Header>
						<strong className="mr-auto">{title}</strong>
					</Toast.Header>
					<Toast.Body>{message}</Toast.Body>
				</Toast>
			</div>
		);
	},

	Bottom: function Bottom({ toastShow, setToastShow, message, title }) {
		return (
			<div
				aria-live="polite"
				aria-atomic="true"
				style={{
					position: "fixed",
					right: "2%",
					bottom: "3%",
					zIndex: 5
				}}
			>
				<Toast show={toastShow} onClose={() => setToastShow(false)} delay={3000} autohide>
					<Toast.Header>
						<strong className="mr-auto">{title}</strong>
					</Toast.Header>
					<Toast.Body>{message}</Toast.Body>
				</Toast>
			</div>
		);
	}
};

Push.Top.propTypes = Push.Bottom.propTypes = {
	toastShow: PropTypes.bool.isRequired,
	setToastShow: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};
