import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Obfuscate from "react-obfuscate";

import Main from "../components/Main";
import Article from "../components/Main/Article";
import Content from "../components/Main/Content";
import PageHeader from "../components/Page/PageHeader";
import Form from "../components/ContactForm";
import config from "../../content/meta/config";

const styles = theme => ({});

const Contact = () => {
	return (
		<Main>
			<Article>
				<PageHeader title="Contact" />
				<Content>
					Fell free to contact me by email: <Obfuscate email={config.contactEmail} /> or use the form below.
				</Content>
			</Article>
		</Main>
	);
};

Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Contact);