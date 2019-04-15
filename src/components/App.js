import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import Actions from '../actions';

import SignInPage from './SignInPage';
import BasePage from './BasePage';

import "antd/dist/antd.css";

class App extends Component {
	componentDidMount() {
		this.props.handleVerifyAuthedUser();
	}

	renderHome = (props) => {
		const { authedUser } = this.props;
		if (authedUser) {
			return <BasePage />
		} else {
			const to = { pathname: '/signin' };

			if (props.location.pathname !== '/') {
				to.search = '?goto=' + encodeURIComponent(props.location.pathname);
			}

			return <Redirect to={to} />
		}
	}

	renderSignIn = (props) => {
		const { authedUser } = this.props;
		if (authedUser) {
			let pathname = '/';
			const gotoMatch = props.location.search.match(/goto=.+&?$/);

			if (gotoMatch) {
				const gotoStr = gotoMatch[0];
				pathname = decodeURIComponent(gotoStr.split('=')[1]);
			}

			return <Redirect to={pathname} />
		} else {
			return <SignInPage />
		}
	}

	render() {
		return (
			<Switch>
				<Route exact path='/signin' render={this.renderSignIn} />
				<Route path='/' render={this.renderHome} />
			</Switch>
		);
	}
}

function mapStateToProps (state) {
	const { authedUser } = state;
	return { authedUser };
}

function mapDispatchToProps (dispatch) {
	const { handleVerifyAuthedUser } = Actions.AuthedUser
	return bindActionCreators({
		handleVerifyAuthedUser
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
