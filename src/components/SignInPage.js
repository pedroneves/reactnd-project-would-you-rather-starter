import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

import Actions from '../actions';

import SignInUserCard from './SignInUserCard';
import { Card, Col, Icon, Row, Spin } from 'antd';

import '../styles/sign-in-page.css'

class SignInPage extends Component {
	componentDidMount () {
		this.props.onMount();
	}

	renderLoadingIcon () {
		const icon = (<Icon type="loading" style={{ fontSize: 24 }} spin />)
		return (
			<div className="loading">
				<Spin indicator={icon}></Spin>
			</div>
		);
	}

	renderAvailableUsers () {
		let { users, onSignIn } = this.props;

		if (users.isLoading) {
			return this.renderLoadingIcon()
		}

		if (!users || !users.ids || users.ids.length === 0) {
			return (<p style={{textAlign: 'center'}}>No users available!</p>)
		}

		return (
			<Fragment>
				{
					users.ids.map(id => {
						return <SignInUserCard
							key={id}
							user={users.byId[id]}
							onSelect={onSignIn}
						/>
					})
				}
			</Fragment>
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
						<Card className="users-card-box">
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

SignInPage.propTypes = {
	users: PropTypes.object.isRequired
}

function mapStateToProps (state) {
	const { users } = state;
	return { users };
}

function mapDispatchToProps (dispatch) {
	const onMount = () => dispatch(Actions.Users.handleGetUsers())
	const onSignIn = (user) => dispatch(Actions.AuthedUser.handleSignIn(user))
	return { onMount, onSignIn }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);