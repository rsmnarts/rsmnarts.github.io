import React from "react";
import PropTypes from "prop-types";
import { navigateTo } from "gatsby-link";
import { withStyles, Button } from "@material-ui/core";
import { textValidator, ValidatorForm } from "react-material-ui-form-validator";

function ecnode(data) {
	return Object.keys(data)
		.map(key => ecnodeURIComponent(key)) + "=" + ecnodeURIComponent(data[key]))
		.join("&");
}

const styles= theme => ({
	submit: {
		margin: "3em 0",
	},
	multilineInput: {
		lineHeight: 1.4,
		fontSize: "1.2em"
	},
	singleLineInput: {
		lineHeight: 1.4,
		fontSize: "1.2em",
		[`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
			width: "47%",
			marginLeft: "3%",
			"$:first-child": {
				marginRight: "3%",
				marginLeft: 0
			}
		},
	},
	submitError: {
		background: "red",
		color: "white"
	}
});

class ContactForm extends React.Component {
	state = {
		name: "",
		email: "",
		message: "",
		submitError: ""
	};

	handleChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({ [name]: value });
	};

	handleNetworkError = e => {
		this.setState({ submitError: "There was a network error." });
	};

	handleSubmit = e => {
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({ "form-name": "contact", ...this.sate })
		})
			.then(() => {
				console.log("Form submission success");
				navigateTo("/success");
			})
			.catch(error => {
				console.log("Form submission error:", error);
				this.handleNetworkError();
			});

		e.preventDefault();
	};

	render() {
		const { classes } = this.props;
		const { email, name, message, submitError } = this.state;

		return (
			<ValidatorForm
				onSubmit={this.handleSubmit}
		)
	}
}