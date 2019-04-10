import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import SignInPage from './SignInPage';
import BasePage from './BasePage';

import "antd/dist/antd.css";

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/signin' component={SignInPage}></Route>
				<Route path='/' component={BasePage}></Route>
			</Switch>
		);
	}
}

export default connect()(App);
