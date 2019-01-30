import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "gatsby-link"
import {
	MenuItem, MenuList, IconButton, Grow,
	Paper, ClickAwayListener, withStyles,
	Icon, Popper
} from "@material-ui/core";

const styles= theme => ({
	topMenu: {
    float: "right",
    margin: "5px 10px 0 0",
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

class TopMenu extends React.Component {
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
		const { classes, pages } = this.props;
		const { open, anchorEl } = this.state;
		const id = open ? 'simple-popper' : null;

		return (
			<nav className={classes.topMenu}>
				<IconButton
          aria-label="More"
          aria-owns={anchorEl ? "long-menu" : null}
          // aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.open}
					aria-describedby={id}
					onClick={this.handleClick}
				>
					<Icon>more_vert</Icon>
				</IconButton>
				<Popper
					id={id} open={open}
					anchorEl={anchorEl}
					transition
          className={`${classNames({ [classes.popperClose]: !open })} ${classes.popper}`}
				>
				<ClickAwayListener onClickAway={this.handleClose}>
					<Grow in={open} id="menu-list" style={{ transformOrigin: "0 0 0" }}>
						<Paper>
							<MenuList role="menu">
								<MenuItem
									onClick={e => {
										this.props.homeLinkOnClick(e);
										this.handleClose();
									}}
								>
									Home
								</MenuItem>
								{pages.map((page, i) => {
									const { fields, frontmatter } = page.node;

									return (
										<Link key={fields.slug} to={fields.slug} style={{ display: "block" }}>
											<MenuItem
												onClick={e => {
													this.props.pageLinkOnClick(e);
													this.handleClose();
												}}
											>
												{frontmatter.menuTitle ? frontmatter.menuTitle : frontmatter.title}
											</MenuItem>
										</Link>
									);
								})}
								<Link to="/contact/" style={{ display: "block" }}>
									<MenuItem
										onClick={e => {
											this.props.pageLinkOnClick(e);
											this.handleClose();
										}}
									>
									
									</MenuItem>
								</Link>
							</MenuList>
						</Paper>
					</Grow>
				</ClickAwayListener>
				</Popper>
			</nav>
		);
	}
}

TopMenu.propTypes = {
  pages: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
	pageLinkOnClick: PropTypes.func.isRequired,
	homeLinkOnClick: PropTypes.func.isRequired
};

export default withStyles(styles)(TopMenu);