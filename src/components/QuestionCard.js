import Moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Avatar, Card, Col, Row, Tooltip } from 'antd';

import '../styles/question-page.css'

class QuestionCard extends Component {
	render () {
		const { question={}, author={}, vote } = this.props;
		const { name='authorName', avatarURL='avatarURL' } = author;
		const { optionOne={}, optionTwo={} } = question;

		const votedOne = vote === 'optionOne';
		const votedTwo = vote === 'optionTwo';
		const hasVoted = votedOne || votedTwo;

		return (
			<div className="question-page">
				<Row type="flex" justify="center">
					<h1 className="title">Would you rather...</h1>
				</Row>
				<Row className="option-container" type="flex" justify="space-around">
					<Col md={6} sm={8} xs={24}>
						<Tooltip title="You voted this" visible={votedOne}>
							<p className="option">{optionOne.text}</p>
						</Tooltip>
					</Col>
					<Col md={6} sm={8} xs={24}>
						<p className="option-or">OR</p>
					</Col>
					<Col md={6} sm={8} xs={24}>
						<Tooltip title="You voted this" visible={votedTwo}>
							<p className="option">{optionTwo.text}</p>
						</Tooltip>
					</Col>
				</Row>
				<Row className="author-container" type="flex" justify="center">
					<Col xl={8} lg={12} md={14} sm={18} xs={23}>
						<Card>
							<h4>Posted By</h4>

							<Row type="flex" justify="start" align="middle" gutter={20}>
								<Col>
									<Avatar size={55} icon="user" src={avatarURL} />
								</Col>
								<Col>
									<h3>{name}</h3>
									<h4 disabled={true}>Asked at {Moment(question.timestamp).format('MM-DD-YYYY HH:mm')}</h4>
								</Col>
								<Col></Col>
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
	vote: PropTypes.oneOf(['optionOne', 'optionTwo']),
}

export default QuestionCard;