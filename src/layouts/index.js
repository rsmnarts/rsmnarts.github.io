import React from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core";
import { connect } from "react-redux";

import withRoot from "../withRoot";

import theme from "../styles/theme";
import globals from "../styles/globals";

import { setFontSizeIcrease, setIsWideScreen } from "../state/store";

import asyncComponent from "../components/common/AsyncComponent";
import Loading from "../components/common/Loading";
import Navigator from "../components/Navigator";
import ActionsBar from "../components/ActionsBar";
import InfoBar from "../components/InfoBar";
import LayoutWrapper from "../components/LayoutWrapper";

import { isWideScreen, timeoutThrottleHandler } from "../utils/helpers";

const InfoBox = asyncComponent(
	() =>
		import("../components/InfoBox")
			.then(module => {
				return module;
			})
			.catch(error => {}),
		<Loading
			overrides={{ width: `${theme.info.sizes.width}px`, height: "100vh", right: "auto" }}
			afterRight={true}
		/>
);

class Layout extends React.Component {
	timeouts = {};
	categories = [];

	componentDidMount() {
		this.props.setIsWideScreen(isWideScreen());
		if (typeof windows !== "undefined") {
			windows.addEventListener("resize", this.resizeThrottler, false);
		}
	}

	componentWillMount() {
		if (typeof localStorage !== "undefined") {
			const inLocal = +localStorage.getItem("font-size-increase");
			const inStore = this.props.fontSizeIncrease;

			if (inLocal && inLocal !== inStore && inLocal >= 1 && inLocal <= 1.5) {
				this.props.setFontSizeIcrease(inLocal);
			}
		}

		this.getCategories();
	}

	getCategories = () => {
		this.categories = this.props.data.posts.edges.reduce((list, edge, i) => {
			const category = edge.node.frontmatter.category;

			if (category && !list.indexOf(category)) {
				return list.concat(edge.node.frontmatter.category);
			} else {
				return list;
			}
		}, []);
	};

	resizeThrottler = () => {
		this.props.setIsWideScreen(isWideScreen());
	};

	render() {
		const { children, data } = this.props;

		return (
			<LayoutWrapper>
				{children()}
				<Navigator posts={data.posts.edges} />
				<ActionBar categories={this.categories} />
				<InfoBar pages={data.pages.edges} parts={data.parts.edges} />
				{this.props.isWideScreen && <InfoBox pages={data.pages.edges} parts={data.parts.edges} />}
			</LayoutWrapper>
		);
	}
}

Layout.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  setIsWideScreen: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  fontSizeIncrease: PropTypes.number.isRequired,
  setFontSizeIncrease: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		pages: state.pages,
		isWideScreen: state.isWideScreen,
		fontSizeIncrease: state.fontSizeIncrease
	};
};

const mapDispatchToProps = {
	setIsWideScreen,
	setFontSizeIncrease
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRoot(withStyles(globals)(Layout)))

//eslint-disable-next-line no-undef
export const query = graphql`
	query LayoutQuery {
		posts: allMarkdownRemark(
		filter: { id: { regex: "//posts//" } }
		sort: { fields: [fields___prefix], order: DESC }
		) {
			edges {
				node {
					excerpt
					fields {
						slug
						prefix
					}
					frontmatter {
						title
						subTitle
						category
						cover {
							children {
								... on ImageSharp {
									resolutions(width: 90, height: 90) {
										...GatsbyImageSharpResolutions_withWebp_noBase64
									}
								}
							}
						}
					}
				}
			}
		}
		pages: allMarkdownRemark(
			filter: { id: { regex: "//pages// " }, fields: { prefix: { regex: "/^\\d+$/"} } }
			sort: { fields: [fields___prefix], order: ASC }
		) {
			edges {
				node {
					fields {
						slug
						prefix
					}
					frontmatter {
						title
						menuTitle
					}
				}
			}
		}
		parts: allMarkdownRemark(filter: { id: { regex: "//parts//" } }) {
			edges {
				node {
					html
					frontmatter {
						title
					}
				}
			}
		}
	}
`;