import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import '../styles/nav.css';

class Nav extends Component {
	render() {
		const { sections } = this.props;

		return (
			<div className="nav">
				{
					sections.map(section => {
						const { selectedIf = [] } = section;
						const classes = ['nav-button'];

						const locationPath = this.props.location.pathname;
						const isLocationPathEqualsToPath = locationPath === section.path;
						const isSelectedIfEqualToPath = selectedIf.includes(locationPath);
						const isSelected = isLocationPathEqualsToPath || isSelectedIfEqualToPath;

						if (isSelected) {
							classes.push('nav-selected');
						}

						return (
							<Link key={section.name} className={classes.join(' ')} to={section.path}>
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