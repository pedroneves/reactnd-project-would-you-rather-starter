import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import QuestionCard from './QuestionCard';

import { handleSelectAnswer } from '../actions/questions';

class QuestionPage extends Component {
	render () {
		const questionId = this.props.match.params.id;

		const question = Object.assign({}, this.props.questions.byId[questionId]);
		const author = Object.assign({}, this.props.users.byId[question.author]);
		const vote = this.props.authedUser.answers[questionId];

		return (
			<Row>
				<Col xs={1} sm={2} md={4} lg={6} xl={7} xxl={8}></Col>
				<Col xs={22} sm={20} md={16} lg={12} xl={10} xxl={8}>
					<QuestionCard
						question={question}
						author={author}
						vote={vote}
						onSelectOption={
							(answerType) => {
								const userId = this.props.authedUser.id;
								const questionId = question.id;
								this.props.handleSelectAnswer({
									userId, questionId, answerType
								});
							}
						}
					/>
				</Col>
				<Col xs={1} sm={2} md={4} lg={6} xl={7} xxl={8}></Col>
			</Row>
		)
	}
}

function mapStateToProps (state) {
	const { authedUser, questions, users } = state;
	return { authedUser, questions, users };
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		handleSelectAnswer
	}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionPage));