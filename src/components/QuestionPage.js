import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import QuestionCard from './QuestionCard';

class QuestionPage extends Component {
	render () {
		const questionId = this.props.match.params.id;

		const question = Object.assign({}, this.props.questions.byId[questionId]);
		const author = Object.assign({}, this.props.users.byId[question.author]);

		let vote = this.props.authedUser.answers[questionId];

		return (
			<QuestionCard question={question} author={author} vote={vote} />
		)
	}
}

function mapStateToProps (state) {
	const { authedUser, questions, users } = state;
	return { authedUser, questions, users };
}

export default withRouter(connect(mapStateToProps)(QuestionPage));