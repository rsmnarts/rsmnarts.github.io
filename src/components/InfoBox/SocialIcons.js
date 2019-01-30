import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import config from "../../../content/meta/config";

import GithubIcon from "!svg-react-loader!../../images/svg-icons/github.svg?name=GithubIcon";
import FacebookIcon from "!svg-react-loader!../../images/svg-icons/facebook.svg?name=FacebookIcon";
import TwitterIcon from "!svg-react-loader!../../images/svg-icons/twitter.svg?name=TwitterIcon";

const styles = theme => ({
	social: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "warp"
	},
	link: {
		display: "inline-block",
		padding: "5px",
		"&:hover": {
			"& svg": {
				fill: theme.info.colors.socialIconsHover
			}
		}
	},
	svg: {
		width: "40px",
		height: "40px",
		fill: theme.info.colors.socialIcons,
		transition: "all .5s"
	}
});

const SocialIcons = props => {
	const { classes } = props;
	const items = config.authorSocialLinks;
	const icons = {
		github: GithubIcon,
		facebook: FacebookIcon,
		twitter: TwitterIcon
	}

	return (
		<div className={classes.social}>
			{items.map(item => {
				const Icon = icons[item.name];

				return (
					<a
						href={item.url}
						key={item.name}
						className={classes.link}
						target="_blank"
						rel="noopener noreferrer"
						title={item.name}
					>
						<Icon className={classes.svg} />
					</a>
				);
			})}
		</div>
	);
};

SocialIcons.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SocialIcons);