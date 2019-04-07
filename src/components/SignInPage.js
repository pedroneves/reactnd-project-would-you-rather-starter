import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react';

import { Row, Col, Card } from 'antd';

import '../styles/sign-in-page.css'

class SignInPage extends Component {
	renderAvailableUsers () {
		const { users } = this.props;

		if (!users || users.length === 0) {
			return (<p style={{textAlign: 'center'}}>No users available!</p>)
		}

		return (
			<Fragment>{ users.map(user => <div>Some user</div>) }</Fragment>
		)
	}

	render () {
		return (
			<Row className="sign-in-page" type="flex" justify="center" align="middle">
				<Row type="flex" justify="center" className="sign-in-row">
					<h1>Would you rather...</h1>
				</Row>

				<Row type="flex" justify="center" className="sign-in-row">
					<h2>1 - Sign in</h2>
				</Row>

				<Row type="flex" justify="center" className="sign-in-row">
					<Col lg={10} md={12} sm={18} xs={23}>
						<Card className="users-card">
							<h2 className="who-are-you">Who are you?</h2>
							{this.renderAvailableUsers()}
						</Card>
					</Col>
				</Row>

				<Row type="flex" justify="center" className="sign-in-row">
					<h3>or</h3>
				</Row>

				<Row type="flex" justify="center" className="sign-in-row">
					<a href="https://theuselessweb.com" target="blank">2 - do something else...</a>
				</Row>
			</Row>
		)
	}
}

function mapStateToProps (state) {
	const { users } = state;
	return { users };
}

export default connect(mapStateToProps)(SignInPage);