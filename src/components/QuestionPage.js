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