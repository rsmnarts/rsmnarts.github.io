import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
	MenuItem, MenuList, IconButton, Grow,
	Paper, ClickAwayListener, withStyles,
	Icon, Popper
} from "@material-ui/core";

const styles= theme => ({
	fontSizeSetter: {
		[`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {}
	},
	open: {
		color: theme.bars.colors.icon
	},
	popperClose: {
		pointerEvents: "none"
	}
});

class FontSetter extends React.Component {
	state = {
		anchorEl: null,
		open: false
	};

	ComponentWillUnmount() {
		clearTimeout(this.timeout);
	}

	handleClick = event => {
		this.setState({ open: !this.state.open });
	};

	handleClose = () => {
		if (!this.state.open) {
			return;
		}

		this.timeout = setTimeout(() => {
			this.setState({ open: false });
		});
	};

	handleSetting = e => {
    const val = e.target.innerText.replace("%", "");
    const factor = +val / 100;
    this.props.increaseFont(factor);
    this.handleClose();
  };

	render() {
		const { classes } = this.props;
		const { open, anchorEl } = this.state;
		const id = open ? 'font-setter' : null;

		return (
			<nav className={classes.fontSizeSetter}>
				<IconButton
					aria-label="Increase font size"
					aria-owns={anchorEl ? "long-menu" : null}
					// aria-hashpopup="true"
					onClick={this.handleClick}
					title="Change font size"
					className={classes.open}
				>
					<Icon>format_size</Icon>
				</IconButton>
				<Popper
					id={id} open={open}
					anchorEl={anchorEl}
					transition
          className={`${classNames({ [classes.popperClose]: !open })} ${classes.popper}`}
				>
					<ClickAwayListener onClickAway={this.handleClose}>
	          <Grow in={open} id="font-menu-list" style={{ transformOrigin: "0 0 0" }}>
	            <Paper>
	              <MenuList role="menu">
	                <MenuItem onClick={this.handleSetting}>150%</MenuItem>
	                <MenuItem onClick={this.handleSetting}>125%</MenuItem>
	                <MenuItem onClick={this.handleSetting}>100%</MenuItem>
	              </MenuList>
	            </Paper>
	          </Grow>
	        </ClickAwayListener>
				</Popper>
			</nav>
		);
	}
}

FontSetter.propTypes = {
  classes: PropTypes.object.isRequired,
  increaseFont: PropTypes.func.isRequired
};

export default withStyles(styles)(FontSetter);