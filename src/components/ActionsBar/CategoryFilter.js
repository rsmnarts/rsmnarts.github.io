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
	},
	popper: {
		zIndex: 1
	}
});

class CategoryFilter extends React.Component {
	state = {
		anchorEl: null,
		open: false
	};

	ComponentWillUnmount() {
		clearTimeout(this.timeout);
	}

	handleClick = event => {
		const { currentTarget } = event;
		this.setState(state => ({
			anchorEl: currentTarget,
			open: !state.open
		}));
	};

	handleClose = () => {
		if (!this.state.open) {
			return;
		}

		this.timeout = setTimeout(() => {
			this.setState({ open: false });
		});
	};

	handleFiltering = e => {
		const category = e.target.innerText.trim();
		this.props.filterCategory(category);
		this.handleClose();
	};

	render() {
		const { classes, categories } = this.props;
		const { open, anchorEl } = this.state;
		const id = open ? 'simple-popper' : null;

		return (
			<nav className={classes.fontSizeSetter}>
				<IconButton
					aria-label="Filter by category"
          // aria-haspopup="true"
          onClick={this.handleClick}
          title="Filter the list by category"
          className={classes.open}
					aria-describedby={id}
					onClick={this.handleClick}
				>
					<Icon>filter_list</Icon>
				</IconButton>
				<Popper
					id={id} open={open}
					anchorEl={anchorEl}
					transition
          className={`${classNames({ [classes.popperClose]: !open })} ${classes.popper}`}
				>
					<ClickAwayListener onClickAway={this.handleClose}>
						<Grow in={open} id="cat-menu-list" style={{ transforOrigin: "0 0 0"}}>
							<Paper>
								<MenuList role="menu">
									<MenuItem key="all" onClick={this.handleFiltering}>
										all posts
									</MenuItem>
									{categories.map(category => (
										<MenuItem key={category} onClick={this.handleFiltering}>
											{category}
										</MenuItem>
									))}
								</MenuList>
							</Paper>
						</Grow>
					</ClickAwayListener>
				</Popper>
			</nav>
		);
	}
}

CategoryFilter.propTypes = {
	classes: PropTypes.object.isRequired,
	categories: PropTypes.array.isRequired,
	filterCategory: PropTypes.func.isRequired
};

export default withStyles(styles)(CategoryFilter);