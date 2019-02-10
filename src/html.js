import React from "react";

let stylesStr;
if (process.env.NODE_ENV === `production`) {
	try {
		stylesStr = require(`!raw-loader!../public/styles.css`);
	} catch (e) => {
		console.log(e);
	}
}

export class HTML extends React.Component {
	render() {
		const {
			htmlAttributes, headComponents, bodyAttributes,
			preBodyComponents, body
		} = this.props;
		let css;
		if (process.env.NODE_ENV === `production`) {
			css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }} />;
		}

		return (
			<html {...htmlAttributes}>
				<head>
					<meta chartSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					{headComponents}
					{css}
					<meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#D0E0D8" />
          <meta name="apple-mobile-web-app-title" content="Lazywill" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <link rel="apple-touch-icon" href="/icons/apple-icon-57x57.png" sizes="57x57" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-60x60.png" sizes="60x60" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-72x72.png" sizes="72x72" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-76x76.png" sizes="76x76" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-114x114.png" sizes="114x114" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-120x120.png" sizes="120x120" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-144x144.png" sizes="144x144" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-152x152.png" sizes="152x152" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" sizes="180x180" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
				</head>
				<body {...bodyAttributes}>
          <noscript>You need to enable JavaScript to run this app!</noscript>
          {preBodyComponents}
          <div key={`body`} id="---gatsby" dangerouslySetInnerHTML={{ __html: body }} />
          {preBodyComponents}
				</body>          
			</html>
		);
	}
};