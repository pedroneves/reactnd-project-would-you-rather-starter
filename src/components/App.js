import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

import SignInPage from './SignInPage';

import "antd/dist/antd.css";

class App extends Component {
	render() {
		return (
			<Fragment>
				<Route exact path='/signin' component={SignInPage}></Route>
			</Fragment>
		);
	}
}

export default connect()(App);
