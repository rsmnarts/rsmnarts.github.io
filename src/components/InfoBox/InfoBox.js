import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles, Icon } from "@material-ui/core";

import InfoMenu from "./InfoMenu";
import InfoHeader from "./InfoHeader";
import InfoText from "./InfoText";
import StackIcons from "./StackIcons";

import { featureNavigator, moveNavigatorAside } from "./../../utils/shared";
import { setNavigatorPosition, setNavigatorShape } from "../../state/store";

const styles = theme => ({
	infoBox: {
		display: "none",
		[`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
			display: "block",
			color: theme.info.colors.text,
			background: theme.info.colors.background,
			position: "absolute",
			left: 0,
			top: 0,
			width: `${theme.info.sizes.width}px`,
			height: "100%",
			padding: "200px 40px",
			"&::after": {
				content: `"`,
				position: "absolute",
				right: 0,
				top: "20px",
				bottom: "20px",
				width: "1px",
				borderRight: `1px solid ${theme.base.colors.lines}`
			}
		}
	}
});

class InfoBox extends React.Component {
	avatarOnClick = featureNavigator.bind(this);
	menulinkOnClick = moveNavigatorAside.bind(this);

	expandOnClick = e => {
		this.props.setNavigatorShape("closed");
	};

	render() {
		const { classes, parts, pages, navigatorPosition, navigatorShape } = this.props;
		const info = parts.find(el => el.node.frontmatter.title === "info");

		return (
			<aside 
				className={`
					${classes.infoBox}
					${navigatorPosition ? navigatorPosition : ""}
					${navigatorShape ? navigatorShape : ""}
				`}
			>
				{info && (
					<InfoHeader
						info={info}
						avatarOnClick={this.avatarOnClick}
						expandOnClick={this.expandOnClick}
					/>
				)}
				<div className={classes.wrapper}>
					{info && <InfoText info={info} />}
					<Icon>social</Icon>
					{pages && <InfoMenu pages={pages} linkOnClick={this.menulinkOnClick} />}
					<Icon>stack</Icon>
				</div>
			</aside>
		);
	}
}

InfoBox.propTypes = {
	classes: PropTypes.object.isRequired,
	parts: PropTypes.array.isRequired,
	pages: PropTypes.array.isRequired,
	navigatorPosition: PropTypes.string.isRequired,
	navigatorShape: PropTypes.string.isRequired,
	isWideScreen: PropTypes.bool.isRequired,
	setNavigatorShape: PropTypes.func.isRequired
};

const mapsStateToProps = (state, ownProps) => {
	return {
		navigatorPosition: state.navigatorPosition,
		navigatorShape: state.navigatorShape,
		isWideScreen: state.isWideScreen
	};
};

const mapDispatchToProps = {
	setNavigatorPosition,
	setNavigatorShape
};

export default connect(
	mapsStateToProps,
	mapDispatchToProps
)(withStyles)(styles)(InfoBox));