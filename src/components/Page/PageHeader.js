import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import AlgoliaIcon from "!svg-react-loader!../../images/svg-icons/algolia-full.svg?name=AlgoliaIcon";

const styles = theme => ({
	header: {
		margin: "0 0 3em",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignContent: "center"
	},
	title: {
		color: theme.main.colors.title,
		fontSize: `${theme.main.fonts.title.size}m`,
		letterSpacing: "-.4em",
		fontWeight: theme.main.fonts.title.weight,
		lineHeight: theme.main.fonts.title.lineHeight,
		margin: "0 0 .4em",
		[`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
			fontSize: `${theme.main.fonts.title.sizeM}em`
		},
		[`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
			fontSize: `${theme.main.fonts.title.sizeL}em`,
			letterSpacing: "-.5em"
		}
	},
	mark: {
		width: "130px",
		display: "block",
		margin: "0 0 0 10px",
		[`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
			width: "170px"
		},
		[`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
			width: "190px"
		}
	}
});

const Header = props => {
	const { classes, title, algolia } = props;

	return (
		<header className={classes.header}>
			<h1 className={classes.title}>{title}</h1>
			{algolia && (
				<a
					className={classes.header}
					href="https://www.algolia.com"
					rel="noopener noreferrer"
					target="_blank"
				>
					<AlgoliaIcon />
				</a>
			)}
		</header>
	);
};

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	algolia: PropTypes.bool
};

export default withStyles(styles)(Header);