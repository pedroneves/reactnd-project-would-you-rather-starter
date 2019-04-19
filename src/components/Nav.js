import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import '../styles/nav.css';

class Nav extends Component {
	render() {
		const sections = [
			{ name: "Unanswered", path: "/unanswered" },
			{ name: "Answered", path: "/answered" },
			{ name: "New", path: "/add" },
			{ name: "Leaderboard", path: "/leaderboard" }
		];

		return (
			<div className="nav">
				{
					sections.map(section => {
						const classes = ['nav-button'];

						if (this.props.location.pathname === section.path) {
							classes.push('nav-selected');
						}

						return (
							<Link className={classes.join(' ')} to={section.path}>
								{section.name}
							</Link>
						)
					})
				}
			</div>
		)
	}
}

export default withRouter(Nav);