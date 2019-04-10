import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import SignInPage from './SignInPage';
import BasePage from './BasePage';

import "antd/dist/antd.css";

class App extends Component {
	renderIfLogged = (component) => {
		return () => {
			const { authedUser } = this.props;
			if (authedUser) {
				return React.createElement(component);
			} else {
				return <Redirect to="/signin" />
			}
		}
	}

	renderIfNotLogged = (component) => {
		return () => {
			const { authedUser } = this.props;
			if (authedUser === null) {
				return React.createElement(component);
			} else {
				return <Redirect to="/" />
			}
		}
	}

	render() {
		return (
			<Switch>
				<Route
					exact
					path='/signin'
					render={this.renderIfNotLogged(SignInPage)}
				></Route>
				<Route
					path='/'
					render={this.renderIfLogged(BasePage)}
				></Route>
			</Switch>
		);
	}
}

function mapStateToProps (state) {
	const { authedUser } = state;
	return { authedUser };
}

export default connect(mapStateToProps)(App);
