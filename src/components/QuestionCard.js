import Moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Avatar, Card, Col, Row, Tooltip } from 'antd';

import '../styles/question-page.css'

class QuestionCard extends Component {
	handleOnSelectOption = (text) => {
		return (event) => {
			event.preventDefault();
			const { vote, question, onSelectOption } = this.props;

			const type = question.optionOne.text === text ? 'optionOne' : 'optionTwo';

			if (!vote) {
				onSelectOption(type)
			}
		}
	}

	renderOption ({ text, hasVoted, showOnly, voteAmount, voteRatio }={}) {
		const containerStyle = {
			cursor: showOnly ? 'inherit' : 'pointer'
		}
		const voteCounterStyle = {
			display: showOnly ? 'block' : 'none',
		};
		const voteCounterTextStyle = { textAlign: 'center' };

		return (
			<div style={containerStyle} onClick={this.handleOnSelectOption(text)}>
				<Tooltip title="You voted this" visible={hasVoted}>
					<p className="option">{text}</p>
				</Tooltip>
				<div style={voteCounterStyle}>
					<h3 style={voteCounterTextStyle}>{voteAmount} {voteAmount === 1 ? 'vote' : 'votes'}</h3>
					<h4 style={voteCounterTextStyle}>{(voteRatio*100).toFixed(1)}%</h4>
				</div>
			</div>
		)
	}

	render () {
		const { question={}, author={}, vote } = this.props;
		const { name='authorName', avatarURL='avatarURL' } = author;
		const { optionOne={}, optionTwo={} } = question;

		const votedOne = vote === 'optionOne';
		const votedTwo = vote === 'optionTwo';
		const hasVoted = votedOne || votedTwo;

		const amountVotesOne = question.optionOne.votes.length;
		const amountVotesTwo = question.optionTwo.votes.length;
		const totalVotes = amountVotesOne + amountVotesTwo;
		const ratioVotesOne = amountVotesOne / totalVotes;
		const ratioVotesTwo = amountVotesTwo / totalVotes;

		return (
			<div className="question-page">
				<Row type="flex" justify="center">
					<h1 className="title">Would you rather...</h1>
				</Row>
				<Row className="option-container" type="flex" justify="space-around">
					<Col md={6} sm={8} xs={24}>
						{
							this.renderOption({
								text: optionOne.text,
								hasVoted: votedOne,
								showOnly: hasVoted,
								voteAmount: amountVotesOne,
								voteRatio: ratioVotesOne
							})
						}
					</Col>
					<Col md={6} sm={8} xs={24}>
						<p className="option-or">OR</p>
					</Col>
					<Col md={6} sm={8} xs={24}>
					{
							this.renderOption({
								text: optionTwo.text,
								hasVoted: votedTwo,
								showOnly: hasVoted,
								voteAmount: amountVotesTwo,
								voteRatio: ratioVotesTwo
							})
						}
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