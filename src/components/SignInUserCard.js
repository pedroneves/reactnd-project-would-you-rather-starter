import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Avatar, Col, Row } from 'antd';

import '../styles/sign-in-user-card.css';

class SignInUserCard extends Component {
	onClick = (event) => {
		event.preventDefault()
		const { user, onSelect=()=>{} } = this.props;
		onSelect(user)
	}

	render () {
		const { avatarURL, name } = this.props.user;

		return (
			<Row
				onClick={this.onClick}
				className="sign-in-user-card"
				type="flex"
				justify="start"
				align="middle"
			>
				<Col className="avatar">
					<Avatar size="large" icon="user" src={avatarURL} />
				</Col>
				<Col className="name">
					<h3>{name}</h3>
				</Col>
			</Row>
		)
	}
}

SignInUserCard.propTypes = {
	user: PropTypes.shape({
		avatarURL: PropTypes.string,
		name: PropTypes.string.isRequired,
	}).isRequired,
	onSelect: PropTypes.func.isRequired,
}

export default SignInUserCard;