import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Avatar, Card, Col, Row, Tooltip } from 'antd';

import '../styles/question-page.css'

class QuestionCard extends Component {
	render () {
		const { question={}, author={}, vote } = this.props;
		const { authorName='authorName', avatarURL='avatarURL' } = author;
		const { optionOne='unkown_option1', optionTwo='unkown_option2' } = question;

		const votedOne = vote === 'one';
		const votedTwo = vote === 'two';

		return (
			<div className="question-page">
				<Row type="flex" justify="center">
					<h1 className="title">Would you rather...</h1>
				</Row>
				<Row type="flex" justify="space-around">
					<Col md={6} sm={8} xs={24}>
						<Tooltip title="You voted this" visible={votedOne}>
							<p className="option">{optionOne}</p>
						</Tooltip>
					</Col>
					<Col md={6} sm={8} xs={24}>
						<p className="option-or">OR</p>
					</Col>
					<Col md={6} sm={8} xs={24}>
						<Tooltip title="You voted this" visible={votedTwo}>
							<p className="option">{optionTwo}</p>
						</Tooltip>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col xl={8} lg={12} md={14} sm={18} xs={23}>
						<Card>
							<h3>Posted By</h3>

							<Row type="flex" justify="start" align="middle" gutter={20}>
								<Col> <Avatar size="large" icon="user" src={avatarURL} /> </Col>
								<Col> <h3>{authorName}</h3> </Col>
								<Col>  </Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

QuestionCard.propTypes = {
	author: PropTypes.object.isRequired,
	question: PropTypes.object.isRequired,
	vote: PropTypes.oneOf(['one', 'two']),
}

export default QuestionCard;